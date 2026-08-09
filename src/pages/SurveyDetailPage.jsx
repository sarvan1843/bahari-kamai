import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout, { Icon } from '../components/Layout';
import { api } from '../api';

export default function SurveyDetailPage() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('monthly');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <Layout hideNav hideHeader>
            <div className="antialiased min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-on-background">
                <div 
                    className="absolute inset-0 z-0 pointer-events-none" 
                    style={{
                        backgroundImage: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M50 0 L100 50 L50 100 L0 50 Z\" fill=\"none\" stroke=\"%238f4e00\" stroke-width=\"1\" opacity=\"0.03\"/></svg>')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "150px"
                    }}
                ></div>
                <main className="w-full max-w-md mx-auto relative z-10 px-container-margin py-xl flex flex-col h-screen md:h-auto md:min-h-[600px] md:shadow-lg md:rounded-xl md:bg-surface-container-lowest md:border md:border-surface-variant">
                    {/* Header / Navigation */}
                    <header className="flex items-center justify-between mb-lg">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface active:scale-95 duration-200">
                            <Icon name="arrow_back" />
                        </button>
                        <div className="flex flex-col items-center">
                            <h1 className="font-headline-sm text-headline-sm-mobile text-on-surface">Financial Habits</h1>
                            <span className="font-label-md text-label-md text-on-surface-variant mt-1">Question 4 of 10</span>
                        </div>
                        <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface active:scale-95 duration-200" title="Exit Survey">
                            <Icon name="close" />
                        </button>
                    </header>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-surface-variant rounded-full mb-xl overflow-hidden relative">
                        <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[40%] rounded-full absolute top-0 left-0 transition-all duration-500 ease-out"></div>
                    </div>

                    {/* Question Content */}
                    <section className="flex-grow flex flex-col">
                        <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">How often do you review your monthly budget?</h2>
                        <div className="flex flex-col gap-md">
                            {[
                                { value: 'daily', label: 'Daily' },
                                { value: 'weekly', label: 'Weekly' },
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'rarely', label: 'Rarely or Never' }
                            ].map(({ value, label }) => {
                                const isSelected = selectedOption === value;
                                return (
                                    <label key={value} className={`relative flex items-center p-md border rounded-lg cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary-fixed hover:bg-primary-fixed-dim' : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'}`}>
                                        <input 
                                            className="peer sr-only" 
                                            name="survey_q4" 
                                            type="radio" 
                                            value={value}
                                            checked={isSelected}
                                            onChange={handleOptionChange}
                                        />
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-md transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-outline'}`}>
                                            <Icon name="check" filled className={`text-[16px] text-on-primary transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                        <span className={`font-body-md text-body-md text-on-surface ${isSelected ? 'font-semibold' : ''}`}>
                                            {label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="mt-auto pt-lg pb-container-margin md:pb-0 w-full">
                        <button className="w-full h-12 bg-primary hover:bg-surface-tint text-on-primary font-label-md text-label-md rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-xs">
                            Next
                            <Icon name="arrow_forward" className="text-[18px]" />
                        </button>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
