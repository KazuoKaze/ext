'use client';

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/loginbutton"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function LoginComp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [error, setError] = useState('');
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
            toast.error("Login failed", {
                description: error.message,
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
            toast.error("Google sign-in failed", {
                description: error.message,
            });
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Reset link sent", {
                description: "Please check your email for the reset link",
            });
        } catch (error: any) {
            toast.error("Reset failed", {
                description: error.message,
            });
        }
    };

    return (
        <Card className="w-[370px] mt-5">
            <CardHeader>
                <CardTitle>Login to account</CardTitle>
                <CardDescription>Enter your email and password to login</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Button 
                        type="button"
                        className="w-full" 
                        variant="outline"
                        onClick={handleGoogleSignIn}
                    >
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{fill: '#4285F4'}}/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{fill: '#34A853'}}/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" style={{fill: '#FBBC05'}}/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{fill: '#EA4335'}}/><path fill="currentColor" d="M1 1h22v22H1z" style={{fill: 'none'}}/></svg>
                        Continue with Google
                    </Button>
                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="link"
                                            className="px-0 font-normal"
                                        >
                                            Forgot password?
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Reset Password</DialogTitle>
                                            <DialogDescription>
                                                Enter your email to receive a password reset link
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="reset-email">Email</Label>
                                                <Input
                                                    id="reset-email"
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    value={resetEmail}
                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter className="sm:justify-end">
                                            <DialogClose asChild>
                                                <Button 
                                                    type="button" 
                                                    variant="default" 
                                                    className="rounded-3xl text-sm"
                                                    onClick={handleResetPassword}
                                                >
                                                    Send Reset Link
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center w-full gap-4">                        
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                    {error && (
                        <div className="text-red-500 text-sm text-center w-full">
                            {error}
                        </div>
                    )}
                </CardFooter>
            </form>
        </Card>
    );
}