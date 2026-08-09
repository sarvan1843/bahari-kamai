import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { useAuth } from '../App';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <Layout hideNav={true}>
      <div className="bg-surface text-on-surface min-h-screen flex flex-col md:justify-center" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30S46.569 60 30 60 0 46.569 0 30 13.431 0 30 0zm0 5c13.807 0 25 11.193 25 25S43.807 55 30 55 5 43.807 5 30 16.193 5 30 5zm0 10c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z' fill='%238f4e00' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
        {/* Top Navigation (Mobile) */}
        <header className="w-full top-0 sticky bg-surface-bright shadow-sm flex justify-between items-center px-container-margin py-sm md:hidden z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">currency_rupee</span>
            <span className="font-headline-sm text-headline-sm-mobile font-bold text-primary">Bahari Kamai</span>
          </div>
          <button className="text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-200 p-2 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </header>

        <main className="flex-1 flex flex-col justify-center items-center px-container-margin py-lg md:py-0 w-full max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-xl w-full">
            <div className="hidden md:flex justify-center items-center gap-2 mb-lg">
              <span className="material-symbols-outlined text-primary text-4xl">currency_rupee</span>
              <h1 className="font-display-lg text-display-lg font-bold text-primary">Bahari Kamai</h1>
            </div>
            <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-sm">Welcome Back</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Sign in to continue your earning journey.</p>
          </div>

          {/* Login Form Card */}
          <div className="bg-surface-container-lowest w-full rounded-xl p-lg shadow-[0_4px_12px_rgba(143,78,0,0.08)]">
            <form className="space-y-lg" onSubmit={handleSubmit}>
              {/* Mobile Number / Email Input */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-surface-container-lowest px-1 font-label-md text-label-md text-on-surface-variant" htmlFor="username">Mobile Number or Email</label>
                <input 
                  className="w-full bg-transparent border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  id="username" 
                  placeholder="Enter your detail" 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3 bg-surface-container-lowest px-1 font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                <input 
                  className="w-full bg-transparent border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                  id="password" 
                  placeholder="Enter password" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a className="font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors" href="#">Forgot Password?</a>
              </div>

              {/* Login Button */}
              <button className="w-full min-h-[48px] bg-gradient-to-r from-primary to-surface-tint text-on-primary font-label-md text-label-md rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200" type="submit">
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="my-xl relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative bg-surface-container-lowest px-4 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline-variant text-sm">local_florist</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-md">
              <p className="text-center font-body-sm text-body-sm text-on-surface-variant">Or login with</p>
              <button className="w-full min-h-[48px] border border-outline-variant bg-transparent rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors active:scale-95 duration-200" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="font-label-md text-label-md text-on-surface">Continue with Google</span>
              </button>
            </div>

            <div className="mt-lg text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">Don't have an account? <Link className="text-primary font-bold hover:underline" to="/signup">Sign up</Link></p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

