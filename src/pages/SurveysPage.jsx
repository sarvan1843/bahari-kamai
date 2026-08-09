import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api';

export default function SurveysPage() {
  const [cpxUrl, setCpxUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const data = await api.getCPXUrl();
        setCpxUrl(data.url);
      } catch (err) {
        console.error("Failed to load CPX URL", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUrl();
  }, []);

  return (
    <Layout>
      <div className="bg-background text-on-background min-h-screen flex flex-col pb-20 md:pl-64">
        {/* Desktop Sidebar Placeholder */}
        <nav className="hidden md:flex fixed left-0 top-16 h-full w-64 bg-surface-container-lowest border-r border-surface-variant flex-col py-lg px-md gap-sm shadow-sm z-30">
          <Link to="/" className="flex items-center gap-md text-on-surface-variant p-md hover:bg-surface-container-high rounded-xl transition-colors text-left w-full">
            <span className="material-symbols-outlined">home</span>
            <span className="font-body-md text-body-md font-semibold">Home</span>
          </Link>
          <Link to="/surveys" className="flex items-center gap-md bg-primary-container text-on-primary-container p-md rounded-xl transition-colors text-left w-full">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>poll</span>
            <span className="font-body-md text-body-md font-semibold">Surveys</span>
          </Link>
          <Link to="/apps" className="flex items-center gap-md text-on-surface-variant p-md hover:bg-surface-container-high rounded-xl transition-colors text-left w-full">
            <span className="material-symbols-outlined">install_mobile</span>
            <span className="font-body-md text-body-md font-semibold">Apps</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-md text-on-surface-variant p-md hover:bg-surface-container-high rounded-xl transition-colors text-left w-full">
            <span className="material-symbols-outlined">person</span>
            <span className="font-body-md text-body-md font-semibold">Profile</span>
          </Link>
        </nav>

        <main className="flex-grow flex flex-col w-full h-[calc(100vh-64px)]">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-on-primary">currency_rupee</span>
              </div>
              <p className="mt-4 text-on-surface-variant font-sans text-body-sm">Loading Surveys...</p>
            </div>
          ) : cpxUrl ? (
            <iframe 
              src={cpxUrl} 
              className="w-full h-full border-none"
              title="CPX Research Surveys"
              allow="clipboard-read; clipboard-write"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-error">
              Could not load surveys. Please try again later.
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
