'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/loginbutton"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import LoginComp from "@/components/cutom_comp/LoginComp"

export default function SignUp() { 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const { signUp, signInWithGoogle, checkUsernameAvailability } = useAuth();
    const router = useRouter();

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameError('');

        if (value.length >= 3) {
            try {
                const isAvailable = await checkUsernameAvailability(value);
                if (!isAvailable) {
                    setUsernameError('Username is already taken');
                }
            } catch (error) {
                console.error('Error checking username:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (username.length < 3) {
            setError('Username must be at least 3 characters long');
            return;
        }

        if (usernameError) {
            setError('Please choose a different username');
            return;
        }

        try {
            await signUp(email, username, password);
            router.push('/dashboard');
        } catch (error: any) {
            setError(error.message);
            toast.error("Sign-up failed", {
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

    return (
        <div className="login__div1">
            <div className="flex justify-between">
                <div className="flex-1 border border-black w-full h-screen flex justify-center items-center bg-[hsl(240,5.9%,10%)]">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        src="https://pfst.cf2.poecdn.net/base/video/5578764313766291e9676b4d3fb45b71d58f157ad1c4da935208388a01526668" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 border border-black w-full h-screen flex justify-center items-center bg-background">
                    <div className="mt-7">
                        <Tabs defaultValue="account" className="w-full rounded-2xl">
                            <TabsList className="w-full flex rounded-2xl">
                                <TabsTrigger value="account" className="flex-1 rounded-2xl">Sign-Up</TabsTrigger>
                                <TabsTrigger value="password" className="flex-1 rounded-2xl">Login</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Card className="w-[370px] mt-5">
                                    <CardHeader>
                                        <CardTitle>Create your account</CardTitle>
                                        <CardDescription>Enter your details below to create your account</CardDescription>
                                    </CardHeader>
                                    <form onSubmit={handleSubmit}>
                                        <CardContent>
                                            <Button 
                                                type="button"
                                                className="w-full" 
                                                variant="outline"
                                                onClick={handleGoogleSignIn}
                                            >
                                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" style={{fill: '#4285F4'}}/>
                                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" style={{fill: '#34A853'}}/>
                                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" style={{fill: '#FBBC05'}}/>
                                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" style={{fill: '#EA4335'}}/>
                                                    <path fill="currentColor" d="M1 1h22v22H1z" style={{fill: 'none'}}/>
                                                </svg>
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
                                                    <Label htmlFor="username">Username</Label>
                                                    <Input 
                                                        type="text" 
                                                        id="username" 
                                                        value={username} 
                                                        onChange={handleUsernameChange}
                                                        placeholder="username" 
                                                        required
                                                        minLength={3}
                                                        className={usernameError ? "border-destructive" : ""}
                                                    />
                                                    {usernameError && (
                                                        <p className="text-destructive text-sm">{usernameError}</p>
                                                    )}
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input 
                                                        type="email" 
                                                        id="email" 
                                                        value={email} 
                                                        onChange={(e) => setEmail(e.target.value)} 
                                                        placeholder="m@example.com" 
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input 
                                                        type="password" 
                                                        id="password" 
                                                        value={password} 
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        placeholder="Enter your password" 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex flex-col items-center justify-center w-full gap-4">                            
                                            <Button type="submit" className="w-full">
                                                Create Account
                                            </Button>
                                            {error && (
                                                <div className="text-destructive text-sm text-center w-full">
                                                    {error}
                                                </div>
                                            )}
                                        </CardFooter>
                                    </form>
                                </Card>
                            </TabsContent>
                            <TabsContent value="password">
                                <LoginComp />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}