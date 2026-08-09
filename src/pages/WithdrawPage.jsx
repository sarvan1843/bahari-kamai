import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function WithdrawPage() {
  const [balance, setBalance] = useState(0);
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('1250');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const wallet = await api.getWallet();
        setBalance(wallet.balance || 1250.50);
      } catch (err) {
        setBalance(1250.50);
      }
    };
    fetchWallet();
  }, []);

  const handleWithdraw = async () => {
    try {
      await api.requestWithdraw({ amount: Number(amount), method, upiId });
      navigate('/history');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout title="Withdraw">
      <main className="w-full max-w-screen-sm mx-auto px-container-margin mt-md flex flex-col gap-lg flex-grow">
        {/* Balance Card */}
        <section className="bg-primary text-on-primary rounded-xl p-lg shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="font-label-md text-label-md opacity-80 uppercase tracking-widest mb-xs">Available Balance</p>
            <div className="flex items-center justify-center gap-xs">
              <span className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg">
                ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </section>

        {/* Withdrawal Methods */}
        <section className="flex flex-col gap-md">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Select Method</h2>
          
          {/* UPI Option */}
          <label className="block relative cursor-pointer">
            <input 
              checked={method === 'upi'} 
              onChange={() => setMethod('upi')}
              className="peer sr-only" 
              name="withdraw_method" 
              type="radio" 
              value="upi"
            />
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all peer-checked:border-primary peer-checked:shadow-[0_0_0_1px_rgba(143,78,0,1)] peer-checked:bg-primary-fixed-dim/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Icon name="qr_code_scanner" />
                  </div>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">UPI Transfer</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center peer-checked:border-primary">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100 hidden peer-checked:block"></div>
                </div>
              </div>
              {/* Expanded Content for UPI */}
              {method === 'upi' && (
                <div className="block pt-xs border-t border-surface-variant">
                  <label className="font-body-sm text-body-sm text-on-surface-variant block mb-xs" htmlFor="upi_id">Enter UPI ID</label>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-12" 
                    id="upi_id" 
                    placeholder="example@ybl" 
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="font-label-md text-label-md text-on-surface-variant mt-xs opacity-70">Instant transfer. No fees.</p>
                </div>
              )}
            </div>
          </label>

          {/* Bank Transfer Option */}
          <label className="block relative cursor-pointer">
            <input 
              checked={method === 'bank'}
              onChange={() => setMethod('bank')}
              className="peer sr-only" 
              name="withdraw_method" 
              type="radio" 
              value="bank"
            />
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all peer-checked:border-primary peer-checked:shadow-[0_0_0_1px_rgba(143,78,0,1)] peer-checked:bg-primary-fixed-dim/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Icon name="account_balance" />
                  </div>
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-on-surface block">Bank Transfer</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">State Bank of India ending in •••• 4021</span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center peer-checked:border-primary">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100 hidden peer-checked:block"></div>
                </div>
              </div>
            </div>
          </label>

          {/* Digital Wallet Option */}
          <label className="block relative cursor-pointer">
            <input 
              checked={method === 'wallet'}
              onChange={() => setMethod('wallet')}
              className="peer sr-only" 
              name="withdraw_method" 
              type="radio" 
              value="wallet"
            />
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md transition-all peer-checked:border-primary peer-checked:shadow-[0_0_0_1px_rgba(143,78,0,1)] peer-checked:bg-primary-fixed-dim/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Icon name="account_balance_wallet" />
                  </div>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">Digital Wallet</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center peer-checked:border-primary">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100 hidden peer-checked:block"></div>
                </div>
              </div>
            </div>
          </label>
        </section>

        {/* Amount to Withdraw */}
        <section className="mt-xs">
          <label className="font-body-sm text-body-sm text-on-surface-variant block mb-xs" htmlFor="amount">Withdrawal Amount</label>
          <div className="relative">
            <span className="absolute left-md top-1/2 -translate-y-1/2 font-headline-md text-on-surface-variant">₹</span>
            <input 
              className="w-full bg-surface-container-lowest border border-outline rounded-lg pl-10 pr-md py-sm font-headline-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-14" 
              id="amount" 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mt-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Min: ₹100</span>
            <button 
              type="button"
              onClick={() => setAmount(balance.toString())}
              className="font-label-md text-label-md text-primary font-bold uppercase tracking-wide"
            >
              Withdraw All
            </button>
          </div>
        </section>

        {/* Note */}
        <div className="bg-surface-container rounded-lg p-sm flex items-start gap-xs mt-auto mb-lg md:mb-0">
          <Icon name="info" className="text-on-surface-variant text-[18px] mt-0.5" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">Transfers are usually processed within 2-4 hours. Bank transfers may take up to 24 hours on weekends.</p>
        </div>

        {/* Fixed Bottom Action (Mobile) */}
        <div className="fixed bottom-0 left-0 w-full p-container-margin bg-surface-container-lowest border-t border-surface-variant md:relative md:border-t-0 md:bg-transparent md:p-0 md:mt-md pb-8 md:pb-0 z-30">
          <button 
            onClick={handleWithdraw}
            className="w-full h-12 bg-secondary text-on-secondary rounded-lg font-body-md font-semibold shadow-md active:scale-95 transition-transform duration-200 flex items-center justify-center gap-xs"
          >
            <Icon name="lock" />
            Withdraw Now
          </button>
        </div>
      </main>
    </Layout>
  );
}
