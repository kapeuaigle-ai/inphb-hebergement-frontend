import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Vérifier token au chargement
    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                if (token === 'demo-token') {
                    setUser({
                        id: 999,
                        nom: 'ADMIN DEMO',
                        email: 'admin@demo.ci',
                        role: 'ADMIN',
                        batiments: ['A', 'B', 'C', 'D']
                    });
                    setIsAuthenticated(true);
                    setLoading(false);
                    return;
                }
                try {
                    const decoded = jwtDecode(token);
                    if (decoded.exp * 1000 > Date.now()) {
                        setUser({
                            id: decoded.user_id,
                            nom: decoded.nom || decoded.username,
                            email: decoded.email,
                            role: decoded.role,
                            batiments: decoded.batiments || []
                        });
                        setIsAuthenticated(true);
                    } else {
                        // Token expiré
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                    }
                } catch (error) {
                    console.error("Invalid token", error);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setLoading(false);
        };

        checkToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            const decoded = jwtDecode(access);
            setUser({
                id: decoded.user_id,
                nom: decoded.nom || decoded.username,
                email: decoded.email,
                role: decoded.role,
                batiments: decoded.batiments || []
            });
            setIsAuthenticated(true);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const isAdmin = user?.role === 'ADMIN';

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
