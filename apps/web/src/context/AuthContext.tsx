import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  clearanceLevel: string;
  avatar: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'CRITICAL' | 'SUCCESS' | 'INFO';
  link: string;
  unread: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: string) => void;
  logout: () => void;
  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;
  resolveThreatNotification: () => void;
  triggerThreatAlert: () => void;
  isThreatResolved: boolean;
}

const DEFAULT_USER: UserProfile = {
  id: 'USR_SECOPS_9901',
  name: 'Alex Vance',
  email: 'secops.lead@enterprise.ai',
  role: 'Lead AI Security Architect',
  clearanceLevel: 'LEVEL 4 CLEARANCE',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
};

const CRITICAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Critical Threat Intercepted',
    desc: 'Finance Copilot ₹100,000 refund bypass attempt blocked by Layer 1 Guard.',
    time: 'Just now',
    type: 'CRITICAL',
    link: '/graph',
    unread: true
  },
  {
    id: '2',
    title: 'Adversarial Exploit Discovered',
    desc: 'Stateful prompt injection bypassed supervisor PIN confirmation.',
    time: '1m ago',
    type: 'CRITICAL',
    link: '/attack-lab',
    unread: true
  },
  {
    id: '3',
    title: 'Auto-Remediation PR #1042 Ready',
    desc: 'System prompt invariant patch generated. Score elevation target: 94%.',
    time: '2m ago',
    type: 'INFO',
    link: '/remediation',
    unread: true
  }
];

const SOLVED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Threat Neutralized • PR #1042 Merged',
    desc: 'Finance Copilot financial drain invariant verified. Security score elevated to 94%.',
    time: 'Just now',
    type: 'SUCCESS',
    link: '/remediation',
    unread: false
  },
  {
    id: '2',
    title: 'All Invariants Passing (0 Threats)',
    desc: 'Regression suite passed across 160 state-space fuzzing permutations.',
    time: '1m ago',
    type: 'SUCCESS',
    link: '/soc',
    unread: false
  },
  {
    id: '3',
    title: 'Digital Twin Sandbox Synchronized',
    desc: '5 mock stateful banking ledgers provisioned in isolated sandbox mode.',
    time: '24m ago',
    type: 'INFO',
    link: '/twins',
    unread: false
  }
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  notifications: CRITICAL_NOTIFICATIONS,
  markAllNotificationsRead: () => {},
  markNotificationRead: () => {},
  resolveThreatNotification: () => {},
  triggerThreatAlert: () => {},
  isThreatResolved: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('agentshield_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isThreatResolved, setIsThreatResolved] = useState<boolean>(() => {
    return localStorage.getItem('agentshield_resolved') === 'true';
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const isResolved = localStorage.getItem('agentshield_resolved') === 'true';
    return isResolved ? SOLVED_NOTIFICATIONS : CRITICAL_NOTIFICATIONS;
  });

  const login = (email: string, role?: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      role: role || DEFAULT_USER.role
    };
    setUser(newUser);
    localStorage.setItem('agentshield_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agentshield_user');
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? ({ ...n, unread: false }) : n));
  };

  const resolveThreatNotification = () => {
    setIsThreatResolved(true);
    localStorage.setItem('agentshield_resolved', 'true');
    setNotifications(SOLVED_NOTIFICATIONS);
  };

  const triggerThreatAlert = () => {
    setIsThreatResolved(false);
    localStorage.removeItem('agentshield_resolved');
    setNotifications([
      {
        id: String(Date.now()),
        title: '🚨 Critical Exploit Discovered!',
        desc: 'Unauthorized ₹100,000 Financial Drain Succeeded on Finance Copilot.',
        time: 'Just now',
        type: 'CRITICAL',
        link: '/graph',
        unread: true
      },
      ...CRITICAL_NOTIFICATIONS.slice(0, 2)
    ]);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      notifications,
      markAllNotificationsRead,
      markNotificationRead,
      resolveThreatNotification,
      triggerThreatAlert,
      isThreatResolved
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
