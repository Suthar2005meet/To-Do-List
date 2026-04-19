import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Service/api';

export const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [authError, setAuthError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setAuthError('');
        try {
            const response = await api.post('/user/register', {
                name: data.name,
                email: data.email,
                password: data.password
            });
            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            setAuthError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 font-sans text-white selection:bg-purple-500/30">
            {/* Background blobs for aesthetics */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="w-full max-w-md relative">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="relative text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Get Started</h1>
                        <p className="text-slate-400 mt-2">Create your account to start managing tasks</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
                        {authError && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center">
                                {authError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                type="text"
                                placeholder="John Doe"
                                className={`w-full bg-slate-800/50 border ${errors.name ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                            <input
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                })}
                                type="email"
                                placeholder="name@company.com"
                                className={`w-full bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                            <input
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" }
                                })}
                                type="password"
                                placeholder="••••••••"
                                className={`w-full bg-slate-800/50 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400 relative">
                        Already have an account?{' '}
                        <Link to="/" className="text-purple-400 hover:text-purple-300 font-medium transition-colors underline decoration-purple-400/30 underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};