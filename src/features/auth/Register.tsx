import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import {useAuth} from '../../hooks/useAuth';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import MiniLoader from "../../components/MiniLoader.tsx";

const Register = () => {
    const navigate = useNavigate();
    const {register} = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await register(formData);
            toast.success('Registration successful!');
            if (result.generalTodoListId) {
                navigate(`/todos/General/${result.generalTodoListId}`);
            }
        } catch (error: any) {
            toast.error(error.data?.errorMessage || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--card))]">
            <div className="w-full max-w-md space-y-8 p-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg shadow-lg">
                <div >
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))]">
                        Create your account
                    </h2 >
                </div >
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div >
                            <label htmlFor="name" className="sr-only">
                                Full name
                            </label >
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Username"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        username: e.target.value
                                    })
                                }
                            />
                        </div >
                        <div >
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label >
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div >
                        <div >
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label >
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })
                                }
                            />
                        </div >
                    </div >

                    <div >
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <MiniLoader size={20}/>
                                    Signing up...
                                </div >
                            ) : (
                                'Sign up'
                            )}
                        </Button >
                    </div >
                </form >

                <p className="mt-2 text-center text-sm text-[hsl(var(--foreground))]">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium"
                    >
                        Sign in
                    </Link >
                </p >
            </div >
        </div >
    );
};

export default Register;
