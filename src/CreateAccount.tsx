import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import AuthHeader from './components/AuthHeader';
import InputField from './components/InputField';
import AuthButton from './components/AuthButton';
import { useRegister } from './hooks/auth/useRegister';

// Re-using icons defined in Login.tsx or similar context
// It would be better to move these to their own file if used in multiple places
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

// Placeholder hooks for backend interaction
// const { mutate: signUp } = usePostSignUp();

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Consider a more user-friendly error display
      return;
    }
    try {
      const response = await register({ email, password });
      // TODO: Handle successful registration, e.g., redirect to login or dashboard
      if (response) { // Assuming response indicates success
        console.log('Registration successful:', response);
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
      // Error is captured by the hook
      console.error('Registration failed:', err);
      // TODO: Display error to user
    }
  };

  return (
    <AuthLayout title="Create Account">
      <AuthHeader 
        mainText="Get Started" 
        subText="Create an account to continue" 
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          icon={<EmailIcon />}
          required
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={<PasswordIcon />}
          required
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          icon={<PasswordIcon />}
          required
        />
        <AuthButton type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </AuthButton>
        {error && <p className="text-red-500 text-center">Registration failed. Please try again.</p>}
      </form>
      <div className="text-center mt-8 text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-teal-400 font-semibold hover:underline">
          Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default CreateAccount; 