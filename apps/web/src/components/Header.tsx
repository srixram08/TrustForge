import React, { useState, useRef, useEffect } from 'react';
import { Terminal, LogOut, ShieldCheck, User, Bell, AlertTriangle, CheckCircle2, Zap, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  const { user, logout, notifications, markAllNotificationsRead, markNotificationRead, isThreatResolved } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleNotificationClick = (link: string, id: string) => {
    markNotificationRead(id);
    setShowNotifications(false);
    navigate(link);
  };

  return (
    <header className="h-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl px-6 lg:px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div>
        <h1 className="text-lg font-black text-slate-900 flex items-center gap-2">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F4F1] border border-slate-200 text-xs text-slate-800 font-mono font-bold">
          <Terminal className="w-3.5 h-3.5 text-black" />
          <span>v2.4-production</span>
        </div>

        {/* Live Interactive Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="SOC Security Alerts"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all relative cursor-pointer ${
              unreadCount > 0 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-[#F4F4F1] hover:bg-[#EFEFEA] border-slate-200 text-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            ) : isThreatResolved ? (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
            ) : null}
          </button>

          {/* Notifications Dropdown Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-5 z-50 space-y-4 card-soft-3d">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900">Security Invariant Alerts</h4>
                  {unreadCount > 0 ? (
                    <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                      Clean Posture
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] font-bold text-slate-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item.link, item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      item.unread 
                        ? 'bg-[#FAF9F7] border-slate-300 shadow-sm' 
                        : 'bg-white border-slate-100 hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.type === 'CRITICAL' && <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                      {item.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                      {item.type === 'INFO' && <Zap className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/evaluations');
                  }}
                  className="text-xs font-bold text-slate-800 hover:text-black flex items-center justify-center gap-1 w-full"
                >
                  <span>View All Invariant Audits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Sign Out Button */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center ring-2 ring-slate-200 shadow-sm">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AV'}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-900">{user?.name || 'Alex Vance'}</div>
              <div className="text-[10px] text-slate-500 font-mono font-semibold">{user?.clearanceLevel || 'LEVEL 4 CLEARANCE'}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            title="Sign Out of Session"
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
