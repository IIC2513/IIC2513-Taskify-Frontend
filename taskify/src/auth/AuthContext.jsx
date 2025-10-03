import api from '../services/api';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        function onStorage(e) {
            if (e.key === 'user') {
                setUser(e.newValue ? JSON.parse(e.newValue) : null);
            }
        }
        window.addEventListener('storage', onStorage);
}, []);

    function decodeJwtPayload(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = parts[1];
            const pad = payload.length % 4;
            const padded = payload + (pad ? '='.repeat(4 - pad) : '');
            const json = atob(padded);
            return JSON.parse(json);
        } catch (e) {
            return null;
        }
    }

    const logoutTimer = useRef(null);

    const scheduleAutoLogout = (token) => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current);
            logoutTimer.current = null;
        }
        if (!token) return;
        const payload = decodeJwtPayload(token);
        if (!payload || !payload.exp) return;
        const expMs = payload.exp * 1000;
        const delay = expMs - Date.now();
        if (delay <= 0) {
            logout();
            return;
        }
        logoutTimer.current = setTimeout(() => {
            logout();
            console.warn('Sesión expirada, cerrando sesión automáticamente');
        }, delay);
    };

    const setSession = (token, u) => {
        if (token) localStorage.setItem('token', token);   
        if (u) localStorage.setItem('user', JSON.stringify(u));
        setUser(u || null);
        scheduleAutoLogout(token);
    };

    const login = async (credentials) => {
        const res = await api.post('/api/auth/login', credentials);
        const token = res.data?.token;
        const u = res.data?.user;
        if (token) localStorage.setItem('token', token);
        if (u) localStorage.setItem('user', JSON.stringify(u));
        setSession(token, u);
        return res;
    };

    const register = async (credentials) => {
        const res = await api.post('/api/auth/register', credentials);
        let token = res.data?.token;
        let u = res.data?.user;
        setSession(token, u);
        return res;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register, setSession }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}

export default AuthContext;


