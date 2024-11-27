'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Define public and protected routes
const publicRoutes = ['/sign-up'];
const protectedRoutes = ['/dashboard'];

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            const isPublicRoute = publicRoutes.includes(pathname);
            const isProtectedRoute = protectedRoutes.includes(pathname);

            if (user) {
                // User is logged in
                if (isPublicRoute) {
                    // Redirect to dashboard if trying to access public routes while logged in
                    router.push('/dashboard');
                }
            } else {
                // User is not logged in
                if (isProtectedRoute) {
                    // Redirect to login if trying to access protected routes while logged out
                    router.push('/sign-up');
                }
            }
            setIsLoading(false);
        }
    }, [user, loading, pathname, router]);

    const value = {
        isAuthenticated: !!user,
        isLoading: loading || isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!value.isLoading && children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
