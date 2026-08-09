import React from 'react';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function DailyRewardPage() {
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

                {/* Reward Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-md mb-lg">
                    {/* Day 1 (Claimed) */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-sm flex flex-col items-center justify-center relative opacity-70">
                        <div className="absolute top-2 right-2">
                            <Icon name="check_circle" className="text-secondary text-sm" filled />
                        </div>
                        <span className="font-label-md text-on-surface-variant mb-xs uppercase">Day 1</span>
                        <Icon name="toll" className="text-primary text-3xl mb-xs" filled />
                        <span className="font-headline-sm text-on-background">+10</span>
                    </div>

                    {/* Day 2 (Claimed) */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-sm flex flex-col items-center justify-center relative opacity-70">
                        <div className="absolute top-2 right-2">
                            <Icon name="check_circle" className="text-secondary text-sm" filled />
                        </div>
                        <span className="font-label-md text-on-surface-variant mb-xs uppercase">Day 2</span>
                        <Icon name="toll" className="text-primary text-3xl mb-xs" filled />
                        <span className="font-headline-sm text-on-background">+20</span>
                    </div>

                    {/* Day 3 (Today - Active) */}
                    <div className="bg-primary-container rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.15)] border-2 border-primary p-sm flex flex-col items-center justify-center relative transform scale-105 z-10 row-span-2 col-span-1 md:col-span-2">
                        <span className="font-label-md text-on-primary-container mb-xs uppercase">Day 3 (Today)</span>
                        <div className="flex items-center gap-xs mb-sm">
                            <Icon name="redeem" className="text-primary text-4xl" filled />
                        </div>
                        <span className="font-display-lg-mobile text-on-primary-container mb-sm">+50</span>
                        <button className="w-full bg-primary text-on-primary font-label-md uppercase tracking-widest py-3 rounded-full shadow-md hover:bg-surface-tint active:scale-95 transition-all">Claim Now</button>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-sm flex flex-col items-center justify-center">
                        <span className="font-label-md text-on-surface-variant mb-xs uppercase">Day 4</span>
                        <Icon name="toll" className="text-surface-variant text-3xl mb-xs" />
                        <span className="font-headline-sm text-on-surface-variant">+80</span>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-sm flex flex-col items-center justify-center">
                        <span className="font-label-md text-on-surface-variant mb-xs uppercase">Day 5</span>
                        <Icon name="toll" className="text-surface-variant text-3xl mb-xs" />
                        <span className="font-headline-sm text-on-surface-variant">+120</span>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant p-sm flex flex-col items-center justify-center">
                        <span className="font-label-md text-on-surface-variant mb-xs uppercase">Day 6</span>
                        <Icon name="toll" className="text-surface-variant text-3xl mb-xs" />
                        <span className="font-headline-sm text-on-surface-variant">+200</span>
                    </div>

                    {/* Day 7 (Big Reward) */}
                    <div className="col-span-3 md:col-span-4 bg-tertiary-container rounded-xl shadow-md border border-tertiary p-md flex items-center justify-between mt-sm">
                        <div className="flex flex-col">
                            <span className="font-label-md text-on-tertiary-container mb-base uppercase">Day 7 Bonus</span>
                            <span className="font-headline-md text-on-tertiary-container">Mystery Box</span>
                            <span className="font-body-sm text-on-tertiary-container opacity-80">Up to 1000 Coins!</span>
                        </div>
                        <div className="relative w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-inner">
                            <Icon name="package_2" className="text-tertiary text-4xl" filled />
                        </div>
                    </div>
                </div>

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
