import React, { useState } from 'react';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function ReferPage() {
    const [copied, setCopied] = useState(false);
    const referralCode = 'SAFFRON2024';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Layout title="Refer & Earn">
            <div className="px-container-margin py-lg max-w-md mx-auto">
                {/* Hero Section */}
                <section className="text-center mb-lg">
                    <div className="w-full h-48 rounded-xl bg-surface-container-high mb-md overflow-hidden relative">
                        <img 
                            className="w-full h-full object-cover" 
                            alt="Refer and Earn" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuL-uZVj_f_G23tYwkbAajT8lTG5HLLBj4fhek4I8VVWuiuxvzkN2yaf5vuIPUqmJGcXzNBzZ0X82D0SfZ2SbKQDnLRElc7qL8eRLtxtmaMQ2Q5Adq3pjdtysKnwxJUE4miHllZi4QSvUNSXIrra8nQyaSIzgbUDqo7ARh_M6uPxFf8bwl_5_bdxrEUirbKpg4f9nEihnNQJ2iQvvwaMLJey9s2KkUJ-fPbzgVymQ_UCPxL9tnFK0" 
                        />
                    </div>
                    <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-background mb-xs">Refer & Earn</h1>
                    <p className="font-body-lg text-body-lg text-primary font-bold">Earn ₹500 per invite</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-base">Invite your friends to Bahari Kamai and start earning together.</p>
                </section>

                {/* Referral Code Card */}
                <section className="bg-surface-container-lowest rounded-xl shadow-[0_8px_24px_rgba(143,78,0,0.08)] p-md mb-lg border border-outline-variant">
                    <p className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase">Your Referral Code</p>
                    <div className="flex items-center justify-between bg-surface-container rounded-lg p-sm border border-outline-variant focus-within:border-primary transition-colors">
                        <span className="font-headline-sm text-headline-sm tracking-widest text-on-background">{referralCode}</span>
                        <button 
                            onClick={handleCopy}
                            className={`flex items-center gap-base font-label-md text-label-md active:scale-95 transition-all p-xs rounded-md ${copied ? 'text-secondary' : 'text-primary hover:text-primary-container'}`}
                        >
                            <Icon name={copied ? 'check' : 'content_copy'} className="text-[18px]" />
                            {copied ? 'COPIED' : 'COPY'}
                        </button>
                    </div>
                </section>

                {/* Share Actions */}
                <section className="grid grid-cols-2 gap-sm mb-xl">
                    <button className="w-full h-12 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md flex items-center justify-center gap-xs shadow-md active:scale-95 transition-transform">
                        <Icon name="share" filled />
                        Share on WhatsApp
                    </button>
                    <button className="w-full h-12 bg-surface-container-lowest text-primary border-2 border-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-xs shadow-sm active:scale-95 transition-transform hover:bg-surface-container">
                        <Icon name="ios_share" />
                        More Options
                    </button>
                </section>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center py-xl relative opacity-40">
                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-outline to-transparent"></div>
                    <Icon name="all_inclusive" className="bg-background px-sm text-outline z-10" />
                </div>

                {/* How it Works */}
                <section>
                    <h2 className="font-headline-md text-headline-md text-on-background mb-md">How it works</h2>
                    <div className="relative pl-6">
                        <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-surface-container-highest"></div>
                        
                        <div className="relative mb-lg flex items-start gap-md">
                            <div className="absolute -left-6 bg-primary-container w-6 h-6 rounded-full flex items-center justify-center z-10 border-4 border-background">
                                <span className="font-label-md text-[10px] text-on-primary-container font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-body-md font-bold text-on-background">Invite Friends</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Share your unique code via WhatsApp or social media.</p>
                            </div>
                        </div>

                        <div className="relative mb-lg flex items-start gap-md">
                            <div className="absolute -left-6 bg-surface-container-highest w-6 h-6 rounded-full flex items-center justify-center z-10 border-4 border-background">
                                <span className="font-label-md text-[10px] text-on-surface-variant font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-body-md font-bold text-on-background">They Join</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Your friend signs up using your referral code.</p>
                            </div>
                        </div>

                        <div className="relative flex items-start gap-md">
                            <div className="absolute -left-6 bg-secondary-container w-6 h-6 rounded-full flex items-center justify-center z-10 border-4 border-background">
                                <span className="font-label-md text-[10px] text-on-secondary-container font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="font-headline-sm text-body-md font-bold text-secondary">You Earn</h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">Get ₹500 credited to your wallet instantly upon their first task completion.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

