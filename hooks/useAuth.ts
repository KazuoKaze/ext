import { useState, useEffect } from 'react';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    User,
    updateProfile
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    query,
    collection,
    where,
    getDocs
} from 'firebase/firestore';
import { auth } from '../config/firebase';

const db = getFirestore();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [needsUsername, setNeedsUsername] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if user has a username in Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setNeedsUsername(!userDoc.exists());
            }
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const checkUsernameAvailability = async (username: string) => {
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    const setUsername = async (username: string) => {
        if (!user) throw new Error("No user logged in");

        const isAvailable = await checkUsernameAvailability(username);
        if (!isAvailable) {
            throw new Error("Username is already taken");
        }

        // Update profile with username
        await updateProfile(user, {
            displayName: username
        });

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username,
            createdAt: new Date().toISOString(),
            uid: user.uid
        });

        setNeedsUsername(false);
    };

    const generateUniqueUsername = async (baseUsername: string): Promise<string> => {
        // First try with the base username
        const isBaseAvailable = await checkUsernameAvailability(baseUsername);
        if (isBaseAvailable) {
            return baseUsername;
        }

        // If not available, try with numbers
        let counter = 1;
        while (counter < 1000) { // Limit attempts to prevent infinite loop
            const newUsername = `${baseUsername}${counter}`;
            const isAvailable = await checkUsernameAvailability(newUsername);
            if (isAvailable) {
                return newUsername;
            }
            counter++;
        }

        // If all attempts fail, generate a random string
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${baseUsername}${randomString}`;
    };

    const signUp = async (email: string, username: string, password: string) => {
        try {
            // Check if username is available
            const isUsernameAvailable = await checkUsernameAvailability(username);
            if (!isUsernameAvailable) {
                throw new Error("Username is already taken");
            }

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get the ID token
            const idToken = await user.getIdToken();
            
            // Set the session cookie
            document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}`; // 5 days

            // Update profile with username
            await updateProfile(user, {
                displayName: username
            });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email,
                username,
                createdAt: new Date().toISOString(),
                uid: user.uid
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Get the ID token
            const idToken = await userCredential.user.getIdToken();
            
            // Set the session cookie
            document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}`; // 5 days
            
            return userCredential.user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            // Get the ID token
            const idToken = await user.getIdToken();
            
            // Set the session cookie
            document.cookie = `session=${idToken}; path=/; max-age=${60 * 60 * 24 * 5}`; // 5 days

            // Check if user already exists in Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            
            if (!userDoc.exists()) {
                // Generate username from email
                const emailUsername = user.email?.split('@')[0] || '';
                // Remove special characters and spaces
                const cleanUsername = emailUsername.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                // Generate a unique username
                const uniqueUsername = await generateUniqueUsername(cleanUsername);

                // Store user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    username: uniqueUsername,
                    createdAt: new Date().toISOString(),
                    uid: user.uid
                });

                // Update profile with username
                await updateProfile(user, {
                    displayName: uniqueUsername
                });
            }

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            // Remove the session cookie
            document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setNeedsUsername(false);
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return {
        user,
        loading,
        needsUsername,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
        checkUsernameAvailability,
        setUsername
    };
};
