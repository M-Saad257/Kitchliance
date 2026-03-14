import React, { useState } from 'react'

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'CEO-KL' && password === 'abc321') {
            onLogin();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#18274e]">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 rounded pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-[#18274e] text-white px-6 py-2 rounded hover:bg-[#0f1a3a]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login