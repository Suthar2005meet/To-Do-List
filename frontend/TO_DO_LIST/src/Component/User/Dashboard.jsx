import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-8">
            <nav className="flex justify-between items-center mb-12 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        To-Do Pro
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm text-slate-400">Welcome back,</p>
                        <p className="font-semibold text-indigo-300">{user?.name || 'User'}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-slate-800 hover:bg-slate-700 text-sm px-5 py-2.5 rounded-xl border border-slate-700 transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                             Your Tasks
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-800/50 group hover:border-indigo-500/30 transition-colors">
                                    <div className="w-6 h-6 rounded-lg border-2 border-slate-700 group-hover:border-indigo-500/50 transition-colors cursor-pointer"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-1/4 bg-slate-800/50 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-3 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-slate-500 hover:text-indigo-400 transition-all font-medium">
                            + Add New Task
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-6 shadow-lg backdrop-blur-sm">
                            <h3 className="font-bold text-indigo-300 mb-2">Pro Tip</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                You can protect any route by wrapping it with our new AuthProvider system.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-lg">
                            <h3 className="font-bold text-slate-300 mb-4 text-sm uppercase tracking-wider">User Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-slate-500">Email Address</p>
                                    <p className="text-sm font-mono text-slate-300">{user?.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Token Status</p>
                                    <p className="text-sm text-green-400 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Active & Secure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
