import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';
import { useAuth } from '../App';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await api.getMe();
        if (u && u.user) setUser(u.user);
        const w = await api.getWallet();
        if (w) setBalance(w.balance || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Layout>
      <main className="max-w-3xl mx-auto px-container-margin pt-lg pb-xl flex flex-col gap-xl">
        {/* Header */}
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface">My Profile</h1>
        </div>

        {/* Profile Card */}
        <section className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_12px_rgba(143,78,0,0.08)] flex items-center gap-md">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container border-2 border-primary/20 shrink-0">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQJKh-L4XzrUfrNKc_haSOmaLQGBLtklKYP1ncxItPuLwClwOoPtvNoAc6HiqLWcONTKH_8htBE-o8Q2UGcyRTf4-hUSvryLZ8BKX2at8KmoRo_Nq8aMqaEpv8tfvC955kOLkgn2H6_yazklNtWGhAiy6_0YQ6rWlRczw1YajejouRZnzJrUNxTp99WgrheiabjQkBYH8uMbVbhlYUaPHzR8LgpP2kgZyZkT0bgchUI9HSG5A_QuU" 
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-xs mb-1">
              <h2 className="font-body-lg text-body-lg font-semibold text-on-surface">{user?.name || 'Loading...'}</h2>
              <Icon name="verified" className="text-secondary-fixed-dim" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }} />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{user?.email || '...'}</p>
            <div className="mt-xs inline-flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-md">
              <Icon name="phone_iphone" className="text-outline" style={{ fontSize: '14px' }} />
              <span className="font-label-md text-label-md text-on-surface-variant">{user?.phone || '...'}</span>
            </div>
          </div>
          <button className="p-xs text-primary hover:bg-surface-container rounded-full transition-colors self-start">
            <Icon name="edit" />
          </button>
        </section>

        {/* Wallet Card */}
        <section className="bg-primary text-on-primary rounded-xl p-lg shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-surface-tint opacity-80 z-0"></div>
          {/* Decorative overlay */}
          <div className="absolute -right-10 -bottom-10 opacity-10 z-0">
            <Icon name="account_balance_wallet" style={{ fontSize: '150px' }} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-md">
            <div>
              <p className="font-label-md text-label-md text-primary-fixed-dim uppercase tracking-wider mb-xs">Available Balance</p>
              <div className="flex items-baseline gap-xs">
                <span className="font-display-lg text-display-lg font-bold">₹{Math.floor(balance).toLocaleString('en-IN')}</span>
                <span className="font-body-md text-body-md text-primary-fixed-dim">.{(balance % 1).toFixed(2).substring(2) || '00'}</span>
              </div>
              <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-xs flex items-center gap-1">
                <Icon name="trending_up" style={{ fontSize: '16px' }} />
                Real-time tracking
              </p>
            </div>
            <Link to="/withdraw" className="bg-secondary text-on-secondary px-lg py-sm rounded-lg font-label-md text-label-md font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-xs min-h-[48px]">
              <Icon name="account_balance" />
              Withdraw Funds
            </Link>
          </div>
        </section>

        {/* Settings List */}
        <section className="flex flex-col gap-sm">
          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider ml-xs mb-xs">Account Settings</h3>
          
          <Link to="/history" className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex items-center justify-between hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <Icon name="history" />
              </div>
              <span className="font-body-md text-body-md text-on-surface">Transaction History</span>
            </div>
            <Icon name="chevron_right" className="text-outline" />
          </Link>

          <Link to="/refer" className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex items-center justify-between hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <Icon name="group_add" />
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-on-surface">Referral Code</span>
                <span className="font-body-sm text-body-sm text-primary">Earn ₹500 per invite</span>
              </div>
            </div>
            <Icon name="chevron_right" className="text-outline" />
          </Link>

          <button className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex items-center justify-between hover:bg-surface-container transition-colors group w-full text-left">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <Icon name="payments" />
              </div>
              <span className="font-body-md text-body-md text-on-surface">Payment Methods</span>
            </div>
            <Icon name="chevron_right" className="text-outline" />
          </button>

          <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider ml-xs mt-md mb-xs">Support &amp; More</h3>
          
          <button className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex items-center justify-between hover:bg-surface-container transition-colors group w-full text-left">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                <Icon name="help_center" />
              </div>
              <span className="font-body-md text-body-md text-on-surface">Help &amp; Support</span>
            </div>
            <Icon name="chevron_right" className="text-outline" />
          </button>

          <button onClick={handleLogout} className="bg-surface-container-lowest rounded-lg p-md shadow-sm flex items-center gap-md hover:bg-error-container transition-colors group mt-sm w-full text-left">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-colors">
              <Icon name="logout" />
            </div>
            <span className="font-body-md text-body-md text-error font-semibold">Logout</span>
          </button>
        </section>
      </main>
    </Layout>
  );
}
