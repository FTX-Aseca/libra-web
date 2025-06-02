import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import AuthHeader from './components/AuthHeader';
import InputField from './components/InputField';
import AuthButton from './components/AuthButton';
import { useLogin } from './hooks/auth/useLogin';

// Placeholder hooks for backend interaction
// const { data, isLoading } = useGetLogin();
// const { mutate: login } = usePostLogin();

const EmailIcon = () => (
  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
  </svg>
);

const PasswordIcon = () => (
  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-1.104.896-2 2-2z" />
  </svg>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, data } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response) {
        console.log('Login successful:', response);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <AuthLayout title="Login">
      <AuthHeader 
        mainText="Welcome to Libra Wallet!" 
        subText="Login to your account" 
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="test_user@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          icon={<EmailIcon />}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={<PasswordIcon />}
          required
        />
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </AuthButton>
        {error && <p className="text-red-500 text-center">Login failed. Please check your credentials.</p>}
      </form>
      <div className="text-center mt-8 text-gray-400">
        Don't have an account?{' '}
        <Link to="/create-account" className="text-teal-400 font-semibold hover:underline">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login; 