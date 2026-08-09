import React, { useState, useEffect } from 'react';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

const DAILY_REWARDS = [10, 20, 50, 80, 120, 200, 500];

export default function DailyRewardPage() {
    const [status, setStatus] = useState({ streak: 0, canClaim: false });
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            const data = await api.getDailyRewardStatus();
            setStatus(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        if (!status.canClaim || claiming) return;
        setClaiming(true);
        setMessage(null);
        try {
            const res = await api.claimDailyReward();
            if (res.success) {
                setMessage(`🎉 Successfully claimed ${res.rewardAmount} coins!`);
                setStatus({ streak: res.newStreak, canClaim: false });
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setClaiming(false);
        }
    };

    return (
        <Layout title="Daily Rewards">
            <div className="max-w-[1200px] mx-auto px-container-margin md:px-xl py-lg relative z-10">
                {/* Festive Background Pattern */}
                <div className="absolute inset-0 pointer-events-none z-[-1]" style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"%23ff9933\" stroke-width=\"0.5\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"50\" r=\"30\" fill=\"none\" stroke=\"%23ff9933\" stroke-width=\"0.5\" opacity=\"0.1\"/><path d=\"M50 10 L50 90 M10 50 L90 50\" stroke=\"%23ff9933\" stroke-width=\"0.5\" opacity=\"0.1\"/></svg>')"
                }}></div>
                
                {/* Header Section */}
                <div className="text-center mb-lg">
                    <h2 className="font-display-lg-mobile md:font-display-lg text-on-background mb-base">Daily Check-in</h2>
                    <p className="font-body-sm text-on-surface-variant">Come back every day for growing rewards!</p>
                </div>

                {message && (
                    <div className="mb-md p-sm bg-primary-container text-on-primary-container rounded-lg text-center font-label-lg shadow-sm border border-primary/20">
                        {message}
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-on-surface-variant py-xl">Loading rewards...</div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-md mb-lg">
                        {DAILY_REWARDS.map((reward, index) => {
                            const isClaimed = index < status.streak || (index === status.streak && !status.canClaim);
                            const isToday = index === status.streak && status.canClaim;
                            const isFuture = index > status.streak;

                            // Day 7 styling
                            if (index === 6) {
                                return (
                                    <div key={index} className={`col-span-3 md:col-span-4 rounded-xl shadow-md border p-md flex flex-col md:flex-row items-center justify-between mt-sm transition-all ${isClaimed ? 'bg-surface-container-lowest border-surface-variant opacity-70' : isToday ? 'bg-tertiary-container border-tertiary transform scale-[1.02] shadow-lg' : 'bg-surface-container-lowest border-surface-variant'}`}>
                                        <div className="flex flex-col text-center md:text-left mb-sm md:mb-0">
                                            <span className={`font-label-md mb-base uppercase ${isToday ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>Day 7 Bonus</span>
                                            <span className={`font-headline-md ${isToday ? 'text-on-tertiary-container' : 'text-on-background'}`}>Mystery Box</span>
                                            <span className={`font-body-sm opacity-80 ${isToday ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>Up to 1000 Coins! (Fixed: {reward})</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="relative w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-inner mb-sm">
                                                <Icon name="package_2" className={`${isToday ? 'text-tertiary' : 'text-surface-variant'} text-4xl`} filled={isClaimed} />
                                            </div>
                                            {isToday && (
                                                <button onClick={handleClaim} disabled={claiming} className="bg-tertiary text-on-tertiary font-label-md uppercase tracking-widest px-6 py-2 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all">
                                                    {claiming ? 'Claiming...' : 'Claim Now'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            // Standard Days 1-6
                            return (
                                <div key={index} className={`rounded-xl shadow-sm border p-sm flex flex-col items-center justify-center relative transition-all ${isClaimed ? 'bg-surface-container-lowest border-surface-variant opacity-70' : isToday ? 'bg-primary-container border-2 border-primary transform scale-105 z-10 row-span-2 col-span-1 md:col-span-2 shadow-[0_4px_12px_rgba(143,78,0,0.15)]' : 'bg-surface-container-lowest border-surface-variant'}`}>
                                    {isClaimed && (
                                        <div className="absolute top-2 right-2">
                                            <Icon name="check_circle" className="text-secondary text-sm" filled />
                                        </div>
                                    )}
                                    <span className={`font-label-md mb-xs uppercase ${isToday ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                                        Day {index + 1} {isToday && '(Today)'}
                                    </span>
                                    
                                    <div className={`flex items-center gap-xs mb-sm ${isToday ? 'mt-xs' : ''}`}>
                                        <Icon name={isToday ? "redeem" : "toll"} className={`${isToday ? 'text-primary text-4xl' : 'text-primary text-3xl'} ${isFuture ? 'opacity-50' : ''}`} filled={isClaimed || isToday} />
                                    </div>
                                    
                                    <span className={`${isToday ? 'font-display-lg-mobile text-on-primary-container mb-sm' : 'font-headline-sm text-on-background'}`}>
                                        +{reward}
                                    </span>

                                    {isToday && (
                                        <button onClick={handleClaim} disabled={claiming} className="w-full bg-primary text-on-primary font-label-md uppercase tracking-widest py-3 rounded-full shadow-md hover:bg-surface-tint active:scale-95 transition-all mt-auto">
                                            {claiming ? 'Wait...' : 'Claim Now'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Divider */}
                <div className="flex items-center justify-center py-xl">
                    <div className="w-16 h-px bg-outline-variant"></div>
                    <Icon name="auto_awesome" className="text-outline-variant mx-sm" />
                    <div className="w-16 h-px bg-outline-variant"></div>
                </div>
            </div>
        </Layout>
    );
}
