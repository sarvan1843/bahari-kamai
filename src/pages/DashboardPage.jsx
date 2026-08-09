import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const w = await api.getWallet();
        const u = await api.getMe();
        setWallet(w);
        setUser(u);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0">
        <main className="w-full max-w-md md:max-w-7xl mx-auto px-container-margin md:px-xl py-lg flex flex-col gap-lg">
          {/* User Greeting */}
          <section className="flex justify-between items-end">
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant">Welcome back,</p>
              <h1 className="font-headline-md text-headline-md text-on-surface">{user?.name || 'Arjun Patel'}</h1>
            </div>
          </section>

          {/* Total Balance Card (Hero) */}
          <section className="w-full rounded-xl overflow-hidden shadow-[0_12px_24px_rgba(143,78,0,0.15)] bg-gradient-to-br from-primary to-primary-container relative p-lg flex flex-col gap-md">
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
              <span className="material-symbols-outlined text-[200px]">generating_tokens</span>
            </div>
            
            <div className="relative z-10">
              <p className="font-label-md text-label-md text-on-primary opacity-80 uppercase tracking-widest">Total Balance</p>
              <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mt-1">
                ₹{wallet?.balance !== undefined ? wallet.balance.toFixed(2) : '0.00'}
              </h2>
            </div>
            
            <div className="relative z-10 flex gap-sm mt-sm">
              <button onClick={() => navigate('/withdraw')} className="flex-1 bg-surface-container-lowest text-primary font-label-md text-label-md py-3 rounded-lg shadow-sm hover:bg-surface-bright transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">account_balance_wallet</span>
                Withdraw
              </button>
              <button onClick={() => navigate('/history')} className="flex-1 border-2 border-surface-container-lowest/30 text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-surface-container-lowest/10 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">history</span>
                History
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-3 gap-sm">
            <button onClick={() => navigate('/daily-reward')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
              </div>
              <span className="font-label-md text-label-md text-center text-on-surface-variant">Daily Reward</span>
            </button>
            
            <button onClick={() => navigate('/refer')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors shadow-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
              </div>
              <span className="font-label-md text-label-md text-center text-on-surface-variant">Invite Friends</span>
            </button>
            
            <button onClick={() => navigate('/spin')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors shadow-sm">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>casino</span>
              </div>
              <span className="font-label-md text-label-md text-center text-on-surface-variant">Spin & Win</span>
            </button>
          </section>

          {/* Section Divider */}
          <div className="w-full flex justify-center py-sm opacity-30">
            <div className="w-full max-w-[200px] h-[1px] bg-outline relative flex items-center justify-center">
              <span className="material-symbols-outlined text-outline bg-background px-2 text-[16px]">diamond</span>
            </div>
          </div>

          {/* Earn More Bento */}
          <section className="flex flex-col gap-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Earn More</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div onClick={() => navigate('/surveys')} className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_12px_rgba(143,78,0,0.04)] border border-surface-container flex items-center justify-between group cursor-pointer hover:shadow-[0_8px_16px_rgba(143,78,0,0.08)] transition-all">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>poll</span>
                  </div>
                  <div>
                    <h4 className="font-body-lg text-body-lg text-on-surface font-semibold">Start Surveys</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Earn up to ₹50 per survey</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
              </div>
              
              <div onClick={() => navigate('/apps')} className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_12px_rgba(143,78,0,0.04)] border border-surface-container flex items-center justify-between group cursor-pointer hover:shadow-[0_8px_16px_rgba(143,78,0,0.08)] transition-all">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-secondary-container/30 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>install_mobile</span>
                  </div>
                  <div>
                    <h4 className="font-body-lg text-body-lg text-on-surface font-semibold">Install Apps</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">New tasks available</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">chevron_right</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
