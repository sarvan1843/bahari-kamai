import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { useAuth } from '../App';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referralCode: '',
    password: ''
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      // Popup alert for successful signup
      alert("Sign-up Successful! Please login with your password.");
      navigate('/login');
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  };

  return (
    <Layout hideNav={true}>
      <div className="bg-background text-on-background min-h-screen font-body-md antialiased flex flex-col md:flex-row" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238f4e00' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
        {/* Left/Top Decor Image Area */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 relative overflow-hidden bg-primary-container">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbw21vFAJeCJJzjQ8EUsNGLHhtatbKsXggMZBkwbNK6Imbk2UrmkcPtBQtqTqSzL5xWcnk245vLm5Ip7mE70dqO2hLqkdZVsONJlJm-bL-jxBmNJO1MR6F4KhI6dzsonB6axw96Mm2eO8gdUgZUc9N-BO29ytzrHwblNiVmO2Oz1ORwaUWgbUzInj28in0deOJzy1zsQUS3mRm9-1LKfwjhEVkm2V-8e2B8Jiri90Mhy2wxTdsTyM')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent flex flex-col justify-end p-xl">
            <div className="flex items-center gap-xs mb-sm">
              <span className="material-symbols-outlined text-primary text-display-lg" style={{ fontVariationSettings: "'FILL' 1" }}>currency_rupee</span>
              <h1 className="font-display-lg text-display-lg text-on-primary-container">Bahari Kamai</h1>
            </div>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-md">Join India's most rewarding digital income platform. Turn your time into real earnings.</p>
          </div>
        </div>

        {/* Right/Bottom Form Area */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center min-h-screen p-container-margin md:p-xl bg-surface-lowest shadow-[-8px_0_24px_rgba(143,78,0,0.05)] relative z-10 overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-center gap-xs mb-xl pt-lg">
            <span className="material-symbols-outlined text-primary text-display-lg-mobile" style={{ fontVariationSettings: "'FILL' 1" }}>currency_rupee</span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary">Bahari Kamai</h1>
          </div>

          <div className="max-w-md w-full mx-auto space-y-lg">
            <div className="text-center md:text-left space-y-xs">
              <h2 className="font-headline-md text-headline-md text-on-surface">Create Account</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Start your earning journey today.</p>
            </div>

            <form className="space-y-sm" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-base" htmlFor="name">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">person</span>
                  </div>
                  <input className="block w-full pl-xl pr-sm py-sm font-body-sm text-body-sm text-on-surface bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-outline" id="name" name="name" placeholder="Enter your full name" required type="text" value={formData.name} onChange={handleChange} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-base" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">mail</span>
                  </div>
                  <input className="block w-full pl-xl pr-sm py-sm font-body-sm text-body-sm text-on-surface bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-outline" id="email" name="email" placeholder="you@example.com" required type="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-base" htmlFor="phone">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">call</span>
                  </div>
                  <input className="block w-full pl-xl pr-sm py-sm font-body-sm text-body-sm text-on-surface bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-outline" id="phone" name="phone" placeholder="+91 00000 00000" required type="tel" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-base" htmlFor="referralCode">Referral Code <span className="text-outline font-normal">(Optional)</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">card_giftcard</span>
                  </div>
                  <input className="block w-full pl-xl pr-sm py-sm font-body-sm text-body-sm text-on-surface bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-outline uppercase" id="referralCode" name="referralCode" placeholder="ENTER CODE" type="text" value={formData.referralCode} onChange={handleChange} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-base" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">lock</span>
                  </div>
                  <input className="block w-full pl-xl pr-sm py-sm font-body-sm text-body-sm text-on-surface bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-outline" id="password" name="password" placeholder="Create a strong password" required type="password" value={formData.password} onChange={handleChange} minLength={6} />
                </div>
              </div>

              <div className="pt-sm">
                <button className="w-full flex justify-center items-center py-sm px-md rounded-lg shadow-md bg-gradient-to-r from-primary to-surface-tint text-on-primary font-label-md text-label-md hover:from-surface-tint hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-95 min-h-[48px]" type="submit">
                  Sign Up
                  <span className="material-symbols-outlined ml-xs text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>

            <div className="mt-lg text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already have an account? 
                <Link className="font-label-md text-label-md text-primary hover:text-surface-tint transition-colors ml-1" to="/login">Login</Link>
              </p>
            </div>

            <p className="mt-xl text-center font-label-md text-[10px] text-outline leading-tight max-w-xs mx-auto">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

