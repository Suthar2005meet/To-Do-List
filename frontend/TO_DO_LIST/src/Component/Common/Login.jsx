import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setAuthError('');
        try {
            const response = await axios.post('/user/login', data);
            if (response.data.token) {
                login(response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setAuthError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-sans text-white selection:bg-indigo-500/30">
            {/* Background blobs for aesthetics */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="w-full max-w-md relative">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Glowing edge effect */}
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 transition duration-500"></div>

                    <div className="relative text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Welcome Back</h1>
                        <p className="text-slate-400 mt-2">Enter your credentials to access your tasks</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
                        {authError && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center animate-shake">
                                {authError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email Address</label>
                            <input
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                                type="email"
                                placeholder="name@company.com"
                                className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Password</label>
                            <input
                                {...register("password", { required: "Password is required" })}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400 relative">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline decoration-indigo-400/30 underline-offset-4">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
