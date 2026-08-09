import React from 'react';
import { Link } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function AppsPage() {
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto px-container-margin md:px-[32px] pt-lg pb-xl">
                {/* Header */}
                <div className="mb-lg">
                    <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-xs">Featured Apps</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">Install and register to earn immediate rewards.</p>
                </div>

                {/* Hot Deals Banner */}
                <section className="mb-xl">
                    <div className="relative bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.08)] overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-outline-variant/50">
                        {/* Watermark Background */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 flex items-center justify-center">
                            <svg className="text-primary" fill="currentColor" height="200" viewBox="0 0 24 24" width="200"><path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z"></path></svg>
                        </div>
                        <div className="md:w-1/3 h-48 md:h-auto relative z-10">
                            <img className="w-full h-full object-cover" alt="Elite Wealth Manager Pro" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZiqqs-m8f253lxWIQ1uPKoQrquC1WMk4eqIZ1etAmKy1-nIuAcqHy4KYx91OFhZZgngvT0iB1GUxX-JQEDseWA4a2LTSTHmP8-DI9UUStZSLFXLpM1YMT1bV-B-O0SbOlrfCYz1L5Sf9NRZuhDkxkgWCIily2B4VuJNxC9OFEwCLzaDmNm40LUJL0QZ5eTvW2kiVCs7cotD4T9gwwEvjZaEG94lIayKmcyh7KouONBFygw9Z0qpY" />
                            <div className="absolute top-4 left-4 bg-error text-on-error font-label-md text-label-md px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <Icon name="local_fire_department" className="text-[14px]" /> Hot Deal
                            </div>
                        </div>
                        <div className="p-lg md:w-2/3 flex flex-col justify-center relative z-10">
                            <div className="flex justify-between items-start mb-sm">
                                <div>
                                    <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Elite Wealth Manager Pro</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Open a free Demat account and complete KYC to unlock this premium reward.</p>
                                </div>
                                <div className="bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-lg font-headline-sm text-headline-sm flex flex-col items-center shadow-sm">
                                    <span className="font-label-md text-label-md opacity-80 uppercase">Reward</span>
                                    <span>₹500</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-md mt-sm">
                                <span className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1">
                                    <Icon name="verified_user" className="text-[14px]" /> KYC Required
                                </span>
                                <span className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1">
                                    <Icon name="account_balance" className="text-[14px]" /> Demat
                                </span>
                            </div>
                            <button className="mt-md bg-primary text-on-primary font-label-md text-label-md h-[48px] rounded-lg px-6 flex items-center justify-center hover:bg-surface-tint transition-colors active:scale-95 duration-200 shadow-sm w-full md:w-auto self-start">
                                Claim ₹500 Now
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section Divider */}
                <div className="flex items-center justify-center py-xl relative">
                    <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
                    <div className="bg-background px-4 relative z-10 text-primary">
                        <Icon name="hotel_class" className="opacity-50" />
                    </div>
                </div>

                {/* App Grid (Bento Style) */}
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-md">Trending Offers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {[
                        { title: 'Foodie Delivery Express', desc: 'Install, Register & Order', reward: '₹120', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG4AJPgJG91UGa9NoNwRug2_M9FGvdzmSQUa_VRuEA7CWGH6k-2opNYBaKQtB4p2NbQiDKqP0u6zeOnXXNjY2r_91gUIc4FJkk06YARb112_2bgIZ_Hxg7z2vtcqwVojC5gwhih7FsRYCqN-eXWVvZaKI0x-qRcGQxlO2rISk7Fse0qoSnpbo2m5ehXMH8sx-6V01DjxHe9vRinEQPx-lhSfDlaTaYUhwgoQRc8y5NdugWBK7FxbQ' },
                        { title: 'GameZone Pro Hub', desc: 'Play 3 Games to level 5', reward: '₹85', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNS8regAUZ1_iIaSoAqtUDaLKOSd7ETs2lfph1UA-AfifqPS2KXgCap10Iq4GJLLobdcEyGCa11ifL-m0qemAVvlf3SOJHkS74fykF7AqWV8tPcf4Wvbn9iD71Hsy9hiZRgx8QL1mvCV9_vu-Du_UtUSXQXsICtORqyN6g7sGPTUSkRQKosjPlxLu7filBAWCBYKNYCSj30vWu8g2Nu7L1l7q3KXd4ebzh1m24dPvH1anCCAFGPRw', highlight: true },
                        { title: 'WealthTrack Planner', desc: 'Install & Link Bank Acc', reward: '₹250', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_sZx7OfiJ6dt-w49NZ6N0U8NW8pCvPgqxiT2q-a6bvV0DgCiaHBVDHE5zs4L6DtfGGsx48d7I1ubKE1tDVEtaAFlMkt97dZ4iK8UtUa5eonjSJupujV4IX-cWmAHHgqt7YXfSJxVIs-76KFYHqN6PjIWGKyZd_Sq6FD_h6j7ZZjD02ohp44VAHVtjHJIv54PGsWHl43Medj2csqHKgC8rYkLn4Y6ojyjXtksEFd_ak_Ecp1OVa8' },
                        { title: 'QuickPay Digital Wallet', desc: 'First Transfer via UPI', reward: '₹100', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqmnYy1P2LV_7Y1qwEJe3y_pCc-oTKraRpCnjL17hKYmpyVeTF4Ujp9n3ZC9DsFneO0XoEzLZuOfeMuWQK9X1CfPGbMg5wY9yensm6JYV7O7kG3Jpvad0OgpD9FS3j0w2-Ja7xLc0J15IyeISAhaLKauUX0WuRnW5aTkQRsACgaOlCPONpXOtoGORzg-1Zmtex7AbrAxrnLUyar47isFR16QQDgNM_yQ8ezJJt9nokDzbh-R2PYZA' }
                    ].map((app, idx) => (
                        <div key={idx} className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(143,78,0,0.08)] p-md flex flex-col hover:shadow-lg transition-shadow duration-200 border border-outline-variant/30 relative overflow-hidden group">
                            {app.highlight && <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full pointer-events-none"></div>}
                            <div className="flex items-start gap-md mb-md relative z-10">
                                <img className="w-16 h-16 rounded-xl object-cover border border-surface-variant shadow-sm flex-shrink-0" alt={app.title} src={app.img} />
                                <div className="flex-grow">
                                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">{app.title}</h4>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{app.desc}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-auto relative z-10 pt-sm border-t border-surface-variant/50">
                                <div className="flex items-center gap-1 text-tertiary font-headline-sm text-headline-sm">
                                    <Icon name="monetization_on" className="text-[20px]" filled />
                                    {app.reward}
                                </div>
                                <button className="bg-primary-container text-on-primary-container font-label-md text-label-md h-[40px] px-4 rounded-lg hover:bg-primary hover:text-on-primary transition-colors active:scale-95 duration-200">
                                    Install Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
