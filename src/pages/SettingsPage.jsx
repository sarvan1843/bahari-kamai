import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Layout title="Settings" hideNav={true}>
      <main className="relative z-10 px-container-margin py-lg max-w-3xl mx-auto space-y-lg flex-1 w-full">
        {/* Account Settings */}
        <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.08)] overflow-hidden">
          <div className="px-md py-sm border-b border-surface-container bg-surface-container-lowest">
            <h2 className="font-label-md text-label-md text-primary tracking-widest uppercase">Account Settings</h2>
          </div>
          <div className="bg-surface-container-lowest">
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm border-b border-surface-container">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="person" className="text-outline" />
                <span className="font-body-md text-body-md">Edit Profile</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm border-b border-surface-container">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="lock" className="text-outline" />
                <span className="font-body-md text-body-md">Change Password</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="shield" className="text-outline" />
                <span className="font-body-md text-body-md">Privacy</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.08)] overflow-hidden">
          <div className="px-md py-sm border-b border-surface-container bg-surface-container-lowest">
            <h2 className="font-label-md text-label-md text-primary tracking-widest uppercase">Preferences</h2>
          </div>
          <div className="bg-surface-container-lowest">
            <div 
              className="transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm border-b border-surface-container cursor-pointer"
              onClick={() => setNotifications(!notifications)}
            >
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="notifications" className="text-outline" />
                <span className="font-body-md text-body-md">Notifications</span>
              </div>
              {/* Toggle Switch */}
              <div className={`w-10 h-6 rounded-full relative shadow-inner transition-colors ${notifications ? 'bg-primary' : 'bg-surface-variant'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-surface-container-lowest rounded-full shadow-sm transition-all ${notifications ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="language" className="text-outline" />
                <div className="flex flex-col items-start">
                  <span className="font-body-md text-body-md">Language</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">English</span>
                </div>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
          </div>
        </section>

        {/* Support */}
        <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.08)] overflow-hidden">
          <div className="px-md py-sm border-b border-surface-container bg-surface-container-lowest">
            <h2 className="font-label-md text-label-md text-primary tracking-widest uppercase">Support</h2>
          </div>
          <div className="bg-surface-container-lowest">
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm border-b border-surface-container">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="help" className="text-outline" />
                <span className="font-body-md text-body-md">Help Center</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm border-b border-surface-container">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="article" className="text-outline" />
                <span className="font-body-md text-body-md">Terms of Service</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
            <button className="w-full transition-colors active:bg-surface-container flex items-center justify-between px-md py-sm">
              <div className="flex items-center gap-sm text-on-surface">
                <Icon name="info" className="text-outline" />
                <span className="font-body-md text-body-md">About Us</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>
          </div>
        </section>

        {/* Logout Action */}
        <div className="pt-md pb-xl">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-xs py-sm px-md rounded-lg bg-surface-container-lowest border-2 border-error text-error font-headline-sm text-headline-sm-mobile active:scale-95 transition-transform duration-150"
          >
            <Icon name="logout" />
            Logout
          </button>
          <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-sm">App Version 1.2.4</p>
        </div>
      </main>
    </Layout>
  );
}
