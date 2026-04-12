import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../Service/api';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskForm, setTaskForm] = useState({ id: null, title: '', description: '', status: 'pending' });

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/task/all');
            setTasks(response.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleOpenModal = (task = { id: null, title: '', description: '', status: 'pending' }) => {
        setTaskForm(task._id ? { id: task._id, title: task.title, description: task.description, status: task.status } : task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (taskForm.id) {
                // Update
                await api.put(`/task/update/${taskForm.id}`, {
                    title: taskForm.title,
                    description: taskForm.description,
                    status: taskForm.status
                });
            } else {
                // Add
                await api.post('/task/add', {
                    title: taskForm.title,
                    description: taskForm.description
                });
            }
            fetchTasks();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/task/delete/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        try {
            await api.put(`/task/update/${task._id}`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
            <nav className="flex justify-between items-center mb-8 md:mb-12 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 md:p-6 rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        To-Do Pro
                    </h1>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-400">Welcome back,</p>
                        <p className="text-sm font-semibold text-indigo-300">{user?.name || 'User'}</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-slate-800 hover:bg-slate-700 text-xs md:text-sm px-4 md:px-5 py-2 rounded-xl border border-slate-700 transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                Your Tasks
                            </h2>
                            <span className="text-xs font-medium bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-slate-700">
                                {tasks.length} total
                            </span>
                        </div>

                        <div className="space-y-4">
                            {loading ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-800/50 animate-pulse">
                                        <div className="w-6 h-6 rounded-lg bg-slate-800"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-3/4 bg-slate-800 rounded"></div>
                                            <div className="h-3 w-1/4 bg-slate-800/50 rounded"></div>
                                        </div>
                                    </div>
                                ))
                            ) : tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div key={task._id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group ${task.status === 'completed' ? 'bg-indigo-500/5 border-indigo-500/20 opacity-75' : 'bg-slate-800/30 border-slate-800/50 hover:border-indigo-500/30'}`}>
                                        <button 
                                            onClick={() => handleToggleStatus(task)}
                                            className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.status === 'completed' ? 'bg-indigo-500 border-indigo-500' : 'border-slate-700 group-hover:border-indigo-500/50'}`}
                                        >
                                            {task.status === 'completed' && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                        <div className="flex-1 min-w-0" onClick={() => handleOpenModal(task)}>
                                            <h3 className={`font-medium text-lg leading-tight truncate ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                                {task.title}
                                            </h3>
                                            <p className={`text-sm mt-1 line-clamp-2 ${task.status === 'completed' ? 'text-slate-600' : 'text-slate-400'}`}>
                                                {task.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleOpenModal(task); }}
                                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
                                                title="Edit Task"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleDelete(task._id); }}
                                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                                                title="Delete Task"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
                                        <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-slate-400 font-medium tracking-tight">No tasks yet</h3>
                                    <p className="text-slate-600 text-sm mt-1">Start by adding your first task below.</p>
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => handleOpenModal()}
                            className="w-full mt-8 py-3 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-slate-500 hover:text-indigo-400 transition-all font-medium active:scale-95"
                        >
                            + Add New Task
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-3xl p-6 shadow-lg backdrop-blur-sm">
                            <h3 className="font-bold text-indigo-300 mb-2">Efficiency Boost</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Organize your day with priority tasks. Toggling a task as complete helps track your daily progress.
                            </p>
                        </div>
                        
                        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-lg">
                            <h3 className="font-bold text-slate-300 mb-4 text-sm uppercase tracking-wider">User Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-300 truncate">{user?.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-xs text-slate-500 mb-2">System Status</p>
                                    <p className="text-sm text-green-400 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Connected & Secure
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
                    <div className="relative w-full max-w-lg bg-[#0f172a] border border-slate-800 rounded-[2rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            {taskForm.id ? 'Edit Task' : 'New Task'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                                <input 
                                    type="text" 
                                    required
                                    value={taskForm.title}
                                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                                    placeholder="What needs to be done?"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-slate-700 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea 
                                    rows="4"
                                    value={taskForm.description}
                                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                                    placeholder="Add some details..."
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-slate-700 transition-all resize-none"
                                ></textarea>
                            </div>
                            
                            <div className="flex gap-4 mt-8">
                                <button 
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-all font-medium text-slate-300"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-bold shadow-lg shadow-indigo-500/25 active:scale-95"
                                >
                                    {taskForm.id ? 'Save Changes' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
