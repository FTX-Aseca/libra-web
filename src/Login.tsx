import React, { useState } from 'react';

// Placeholder hooks for backend interaction
// const { data, isLoading } = useGetLogin();
// const { mutate: login } = usePostLogin();

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call login mutation here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#131A1A]">
      <div className="w-full max-w-md px-6 py-10 rounded-2xl shadow-lg bg-[#131A1A] flex flex-col">
        <h1 className="text-3xl font-bold text-white mb-10 text-left">Login</h1>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome to Libra Wallet!</h2>
        <p className="text-center text-gray-400 mb-8">Login to your account</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="email">Email</label>
            <div className="flex items-center bg-[#183232] rounded-lg px-3 py-2">
              <svg className="w-5 h-5 text-teal-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
              <input
                id="email"
                type="email"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-300"
                placeholder="test_user@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-1" htmlFor="password">Password</label>
            <div className="flex items-center bg-[#183232] rounded-lg px-3 py-2">
              <svg className="w-5 h-5 text-teal-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-1.104.896-2 2-2z" /></svg>
              <input
                id="password"
                type="password"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-300"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-teal-400 text-white font-bold text-lg mt-4 hover:bg-teal-500 transition-colors shadow-none"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-8 text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-teal-400 font-semibold hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 