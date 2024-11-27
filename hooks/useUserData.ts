'use client';

import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';

interface UserProfile {
    username: string;
    email: string;
    createdAt: string;
    uid: string;
}

export const useUserData = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) {
                setProfile(null);
                setLoading(false);
                return;
            }

            try {
                const db = getFirestore();
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    const userData = userDoc.data() as UserProfile;
                    setProfile({
                        username: userData.username,
                        email: user.email || userData.email, // Use Firebase auth email as backup
                        createdAt: userData.createdAt,
                        uid: user.uid
                    });
                } else {
                    console.error("No user profile found for uid:", user.uid);
                    // Create a basic profile from Firebase auth data
                    setProfile({
                        username: user.displayName || user.email?.split('@')[0] || 'user',
                        email: user.email || '',
                        createdAt: new Date().toISOString(),
                        uid: user.uid
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Fallback to Firebase auth data
                if (user) {
                    setProfile({
                        username: user.displayName || user.email?.split('@')[0] || 'user',
                        email: user.email || '',
                        createdAt: new Date().toISOString(),
                        uid: user.uid
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user]);

    return { profile, loading };
};
