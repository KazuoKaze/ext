'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            {children}
            <Toaster />
        </AuthProvider>
    );
}
