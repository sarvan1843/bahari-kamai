import React, { useState, useEffect } from 'react';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function HistoryPage() {
  const [ledger, setLedger] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const data = await api.getLedger();
        setLedger(data);
      } catch (err) {
        // Mock data fallback matching HTML if api fails
        setLedger([
          { id: 1, type: 'earning', title: 'Survey: Finance Opt-in', date: 'TODAY', time: '10:42 AM', amount: 50.00, icon: 'poll' },
          { id: 2, type: 'earning', title: 'App Install: GameZone VIP', date: 'TODAY', time: '08:15 AM', amount: 120.00, icon: 'install_mobile' },
          { id: 3, type: 'withdrawal', title: 'Bank Withdrawal', date: 'YESTERDAY', time: '04:30 PM', amount: 500.00, icon: 'account_balance_wallet' },
          { id: 4, type: 'earning', title: 'Video Ad: Tech Gadgets', date: 'YESTERDAY', time: '11:05 AM', amount: 15.00, icon: 'ondemand_video' },
        ]);
      }
    };
    fetchLedger();
  }, []);

  const filteredLedger = filter === 'all' 
    ? ledger 
    : ledger.filter(item => item.type === filter);

  // Group by date
  const grouped = filteredLedger.reduce((acc, item) => {
    const date = item.date || 'TODAY';
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <Layout>
      <main className="flex-1 w-full max-w-3xl mx-auto px-container-margin py-lg md:py-xl flex flex-col gap-lg z-10">
        {/* Header Section */}
        <div className="flex flex-col gap-base">
          <div className="flex items-center gap-xs text-on-surface-variant cursor-pointer hover:text-primary transition-colors md:hidden w-fit group">
            <Icon name="arrow_back" className="text-body-md group-active:-translate-x-1 transition-transform" />
            <span className="font-label-md text-label-md">Back</span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">Transaction History</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">View your recent earnings and withdrawals.</p>
        </div>

        {/* Filter/Summary Area */}
        <div className="bg-surface-container-lowest rounded-xl p-md flex flex-wrap gap-md items-center justify-between shadow-[0_4px_12px_rgba(143,78,0,0.08)] border border-surface-container">
          <div className="flex gap-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-md py-xs rounded-full font-label-md text-label-md transition-colors active:scale-95 ${filter === 'all' ? 'bg-primary-container text-on-primary-container' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('earning')}
              className={`px-md py-xs rounded-full font-label-md text-label-md transition-colors active:scale-95 ${filter === 'earning' ? 'bg-primary-container text-on-primary-container' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
            >
              Earnings
            </button>
            <button 
              onClick={() => setFilter('withdrawal')}
              className={`px-md py-xs rounded-full font-label-md text-label-md transition-colors active:scale-95 ${filter === 'withdrawal' ? 'bg-primary-container text-on-primary-container' : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}
            >
              Withdrawals
            </button>
          </div>
          <div className="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md bg-surface-container p-xs rounded-lg">
            <Icon name="calendar_month" className="text-[18px]" />
            <span>Last 30 Days</span>
          </div>
        </div>

        {/* Transactions List */}
        <div className="flex flex-col gap-sm">
          {Object.entries(grouped).map(([date, items]) => (
            <React.Fragment key={date}>
              {/* Date Divider */}
              <div className="flex items-center gap-md py-sm mt-md first:mt-0">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">{date}</span>
                <div className="flex-1 h-px bg-surface-variant"></div>
              </div>

              {items.map(item => (
                <div key={item.id} className="bg-surface-container-lowest rounded-xl p-md flex items-center justify-between shadow-[0_4px_12px_rgba(143,78,0,0.08)] border border-surface-container hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className="flex items-center gap-md">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type === 'earning' ? 'bg-secondary-container/20 text-secondary' : 'bg-error-container/20 text-error'}`}>
                      <Icon name={item.icon || (item.type === 'earning' ? 'poll' : 'account_balance_wallet')} />
                    </div>
                    <div className="flex flex-col gap-base">
                      <span className="font-body-md text-body-md font-semibold text-on-background">{item.title}</span>
                      <div className="flex items-center gap-xs text-on-surface-variant font-body-sm text-body-sm">
                        <span>{item.time}</span>
                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                        <span>{item.type === 'earning' ? 'Completed' : 'Processed ending in **45'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-base">
                    <span className={`font-headline-sm text-headline-sm-mobile md:text-headline-sm font-bold ${item.type === 'earning' ? 'text-secondary' : 'text-error'}`}>
                      {item.type === 'earning' ? '+' : '-'} ₹{item.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="py-lg flex justify-center">
          <button className="font-label-md text-label-md text-primary flex items-center gap-xs hover:bg-surface-container px-md py-xs rounded-full transition-colors active:scale-95">
            Load More <Icon name="expand_more" className="text-[18px]" />
          </button>
        </div>
      </main>
    </Layout>
  );
}
