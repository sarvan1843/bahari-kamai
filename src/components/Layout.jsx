import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/* ─── Icon helper ─── */
export function Icon({ name, className = '', fill = false }) {
  return (
    <span className={`material-symbols-outlined ${fill ? 'fill' : ''} ${className}`}>
      {name}
    </span>
  );
}

/* ─── Header ─── */
export function Header({ title = 'Bahari Kamai', onBack, showNotification = true }) {
  const location = useLocation();
  const isSubPage = ['/withdraw', '/settings', '/refer', '/daily-reward', '/spin', '/survey/'].some(
    p => location.pathname.startsWith(p)
  );

  return (
    <header className="w-full top-0 sticky z-40 bg-surface-bright shadow-card">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-container-margin py-sm">
        {isSubPage || onBack ? (
          <button onClick={onBack || (() => window.history.back())} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container">
            <Icon name="arrow_back" className="text-on-surface" />
          </button>
        ) : (
          <div className="flex items-center gap-xs">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Icon name="currency_rupee" className="text-on-primary text-lg" />
            </div>
            <span className="font-serif font-bold text-headline-sm text-primary">Bahari Kamai</span>
          </div>
        )}
        {isSubPage && !onBack && (
          <h1 className="font-serif font-semibold text-headline-sm text-primary">{title}</h1>
        )}
        {showNotification && (
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container relative">
            <Icon name="notifications" className="text-on-surface-variant" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-bright"></span>
          </button>
        )}
        {isSubPage && <div className="w-10" />}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-xl py-sm max-w-7xl mx-auto">
        <div className="flex items-center gap-xs">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Icon name="currency_rupee" className="text-on-primary text-lg" />
          </div>
          <span className="font-serif font-bold text-headline-sm text-primary">Bahari Kamai</span>
        </div>
        <nav className="flex items-center gap-lg">
          {[
            { to: '/', icon: 'home', label: 'Home' },
            { to: '/surveys', icon: 'poll', label: 'Surveys' },
            { to: '/apps', icon: 'install_mobile', label: 'Apps' },
            { to: '/profile', icon: 'person', label: 'Profile' },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1 px-md py-xs text-body-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              <Icon name={item.icon} className="text-[20px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container relative">
          <Icon name="notifications" className="text-on-surface-variant" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-bright"></span>
        </button>
      </div>
    </header>
  );
}

/* ─── Bottom Navigation (Mobile) ─── */
export function BottomNav() {
  const items = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/surveys', icon: 'poll', label: 'Surveys' },
    { to: '/apps', icon: 'install_mobile', label: 'Apps' },
    { to: '/profile', icon: 'person', label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-xl bg-surface-container-lowest shadow-nav flex justify-around items-center py-xs px-gutter pb-5">
      {items.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              isActive ? 'text-on-primary-container' : 'text-on-surface-variant'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`flex items-center justify-center px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-primary-container' : ''}`}>
                <Icon name={item.icon} fill={isActive} className="text-[22px]" />
              </span>
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

/* ─── Layout wrapper ─── */
export default function Layout({ children, hideNav = false, hideHeader = false, title, onBack }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface relative">
      {/* Mandala watermark */}
      <div className="fixed inset-0 mandala-pattern pointer-events-none z-0" />

      {!hideHeader && <Header title={title} onBack={onBack} />}

      <main className="flex-1 relative z-10 pb-20 md:pb-0">
        {children}
      </main>

      {!hideNav && <BottomNav />}
    </div>
  );
}

