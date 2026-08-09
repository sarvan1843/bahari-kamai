import React, { useRef, useState } from 'react';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function SpinWinPage() {
    const wheelRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const baseSpins = 5 * 360;
        const randomDegree = Math.floor(Math.random() * 360);
        const newRotation = rotation + baseSpins + randomDegree;
        
        setRotation(newRotation);

        setTimeout(() => {
            setIsSpinning(false);
        }, 4000);
    };

    return (
        <Layout title="Spin & Win">
            <div className="px-container-margin md:px-xl py-lg max-w-4xl mx-auto flex flex-col items-center">
                {/* Header Section */}
                <div className="text-center mb-lg">
                    <h2 className="font-display-lg-mobile md:font-display-lg text-primary mb-base">Spin & Win</h2>
                    <p className="font-body-md text-on-surface-variant">Test your luck and earn exciting rewards daily!</p>
                </div>

                {/* Wheel Container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 my-lg flex items-center justify-center">
                    {/* Outer Glow / Shadow */}
                    <div className="absolute inset-0 rounded-full shadow-[0_12px_36px_rgba(143,78,0,0.2)] bg-surface-container-lowest border-4 border-primary"></div>
                    
                    {/* The Wheel */}
                    <div 
                        ref={wheelRef}
                        className="relative w-[95%] h-[95%] rounded-full overflow-hidden border-2 border-outline-variant"
                        style={{ 
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)'
                        }}
                    >
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Saffron Primary */}
                            <path d="M50,50 L100,50 A50,50 0 0,1 85.35,85.35 Z" fill="#8f4e00"></path>
                            <text fill="white" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(22.5 50 50) translate(0 0) rotate(-22.5 75 70)" x="75" y="70">₹10</text>

                            {/* Emerald Secondary */}
                            <path d="M50,50 L85.35,85.35 A50,50 0 0,1 50,100 Z" fill="#056e00"></path>
                            <text fill="white" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(67.5 50 50) translate(0 0) rotate(-67.5 60 90)" x="60" y="90">100 Pts</text>

                            {/* Gold Tertiary Container */}
                            <path d="M50,50 L50,100 A50,50 0 0,1 14.64,85.35 Z" fill="#d0af00"></path>
                            <text fill="#514300" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(112.5 50 50) translate(0 0) rotate(-112.5 30 90)" x="30" y="90">₹5</text>

                            {/* Primary Container */}
                            <path d="M50,50 L14.64,85.35 A50,50 0 0,1 0,50 Z" fill="#ff9933"></path>
                            <text fill="#693800" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(157.5 50 50) translate(0 0) rotate(-157.5 15 70)" x="15" y="70">Try Again</text>

                            {/* Secondary Fixed Dim */}
                            <path d="M50,50 L0,50 A50,50 0 0,1 14.64,14.64 Z" fill="#72de5c"></path>
                            <text fill="#012200" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(202.5 50 50) translate(0 0) rotate(-202.5 15 35)" x="15" y="35">₹20</text>

                            {/* Primary Fixed */}
                            <path d="M50,50 L14.64,14.64 A50,50 0 0,1 50,0 Z" fill="#ffdcc2"></path>
                            <text fill="#2e1500" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(247.5 50 50) translate(0 0) rotate(-247.5 30 15)" x="30" y="15">50 Pts</text>

                            {/* Tertiary Fixed */}
                            <path d="M50,50 L50,0 A50,50 0 0,1 85.35,14.64 Z" fill="#ffe16d"></path>
                            <text fill="#221b00" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(292.5 50 50) translate(0 0) rotate(-292.5 60 15)" x="60" y="15">₹50</text>

                            {/* Surface Variant */}
                            <path d="M50,50 L85.35,14.64 A50,50 0 0,1 100,50 Z" fill="#e1e3e4"></path>
                            <text fill="#554336" fontFamily="Inter" fontSize="6" fontWeight="bold" transform="rotate(337.5 50 50) translate(0 0) rotate(-337.5 75 35)" x="75" y="35">Bonus</text>
                        </svg>
                    </div>

                    {/* Pointer / Indicator */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                        <Icon name="location_on" className="text-primary text-4xl filter drop-shadow-md" filled />
                    </div>

                    {/* Center Hub */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-surface-container-lowest rounded-full border-4 border-outline-variant shadow-sm z-10 flex items-center justify-center">
                            <div className="w-4 h-4 bg-primary rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Actions & Info */}
                <div className="w-full max-w-sm flex flex-col items-center gap-md bg-surface-container-lowest p-md rounded-xl shadow-lg border border-surface-container">
                    <div className="flex items-center justify-between w-full px-sm border-b border-surface-variant pb-sm mb-base">
                        <span className="font-body-md text-on-surface-variant">Available Spins:</span>
                        <span className="font-headline-sm text-primary">3</span>
                    </div>
                    <button 
                        onClick={handleSpin}
                        className={`w-full bg-primary text-on-primary font-headline-sm py-sm rounded-lg shadow-md hover:bg-surface-tint active:scale-95 transition-all duration-200 min-h-[48px] flex items-center justify-center gap-xs ${isSpinning ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        <Icon name="sync" className={isSpinning ? 'animate-spin' : ''} />
                        Spin Now
                    </button>
                    <div className="mt-xs text-center flex items-center gap-xs text-secondary bg-secondary-container/20 px-md py-xs rounded-full">
                        <Icon name="timer" className="text-sm" />
                        <span className="font-label-md">Next Free Spin in: <strong>04:23:10</strong></span>
                    </div>
                </div>

                {/* Recent Winners Bento Grid */}
                <div className="w-full max-w-4xl mt-xl">
                    <h3 className="font-headline-sm text-on-surface mb-md px-xs">Recent Winners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                        {[
                            { name: 'Rahul K.', amount: '₹50', initial: 'R', bg: 'bg-tertiary-container', text: 'text-on-tertiary-container', amountColor: 'text-primary', hidden: false },
                            { name: 'Priya S.', amount: '100 Pts', initial: 'P', bg: 'bg-secondary-container', text: 'text-on-secondary-container', amountColor: 'text-secondary', hidden: false },
                            { name: 'Amit M.', amount: '₹20', initial: 'A', bg: 'bg-primary-container', text: 'text-on-primary-container', amountColor: 'text-primary', hidden: true },
                            { name: 'Sneha V.', amount: '₹10', initial: 'S', bg: 'bg-surface-variant', text: 'text-on-surface-variant', amountColor: 'text-primary', hidden: true }
                        ].map((winner, idx) => (
                            <div key={idx} className={`bg-surface-container-lowest p-md rounded-xl shadow-sm border border-surface-container flex items-center gap-sm ${winner.hidden ? 'hidden md:flex' : ''}`}>
                                <div className={`w-10 h-10 ${winner.bg} ${winner.text} rounded-full flex items-center justify-center font-headline-sm`}>{winner.initial}</div>
                                <div>
                                    <p className="font-label-md text-on-surface">{winner.name}</p>
                                    <p className={`font-body-sm ${winner.amountColor} font-bold`}>{winner.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
