import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    FaChartPie,
    FaUserGraduate,
    FaBed,
    FaCheckCircle,
    FaKey,
    FaFileAlt,
    FaUserShield,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const Sidebar = () => {
    const { isAdmin, logout } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: FaChartPie },
        { name: 'Étudiants', path: '/etudiants', icon: FaUserGraduate },
        { name: 'Chambres', path: '/chambres', icon: FaBed },
        { name: 'Affectations', path: '/affectations', icon: FaCheckCircle },
        { name: 'Clés', path: '/cles', icon: FaKey },
        { name: 'Rapports', path: '/rapports', icon: FaFileAlt },
    ];

    if (isAdmin) {
        menuItems.push({ name: 'Admin', path: '/admin', icon: FaUserShield });
    }

    return (
        <>
            {/* Mobile Menu Button - iPhone 12 Optimized */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-gradient-to-br from-primary to-secondary text-white rounded-xl shadow-lg active:scale-95 transition-transform"
                aria-label="Menu"
            >
                {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

            {/* Overlay pour mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Mobile Optimized */}
            <aside className={`
                w-64 sm:w-72 bg-gradient-to-b from-primary to-primary-dark text-white
                flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-50
                transition-transform duration-300 ease-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                overflow-y-auto
            `}>
                {/* Header - Compact on mobile */}
                <div className="p-4 sm:p-6 lg:p-8 pb-6 flex items-center space-x-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-primary font-black text-lg">INP</span>
                    </div>
                    <div>
                        <h1 className="text-base sm:text-lg font-bold leading-none">Hébergement</h1>
                        <p className="text-[9px] sm:text-[10px] text-accent font-medium mt-1 tracking-wide">
                            GESTION UNIVERSITAIRE
                        </p>
                    </div>
                </div>

                {/* Navigation - Touch-friendly spacing */}
                <nav className="flex-1 px-3 sm:px-4 py-4 space-y-1.5">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                                flex items-center px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl
                                transition-all duration-200 group
                                ${isActive
                                    ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-[1.02]'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white active:scale-95'}
                            `}
                        >
                            <item.icon className={`mr-3 sm:mr-4 text-base sm:text-lg ${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                            <span className="font-medium text-sm sm:text-base">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout Button - Touch-friendly */}
                <div className="p-3 sm:p-4 border-t border-white/10 mt-auto">
                    <button
                        onClick={() => {
                            logout();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 sm:px-4 py-3 sm:py-3.5
                                   text-red-300 hover:bg-red-500/10 hover:text-red-400
                                   rounded-xl transition-all duration-200 group active:scale-95"
                    >
                        <FaSignOutAlt className="mr-3 sm:mr-4 group-hover:animate-pulse text-base sm:text-lg" />
                        <span className="font-medium text-sm sm:text-base">Déconnexion</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
