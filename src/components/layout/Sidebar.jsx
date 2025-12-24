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
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-primary text-white rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Overlay pour mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                w-64 bg-primary text-white flex flex-col h-full fixed left-0 top-0 shadow-xl z-40
                transition-transform duration-300 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-8 pb-12 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-primary font-bold text-xl">INP</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-none">Hébergement</h1>
                        <p className="text-[10px] text-accent font-medium mt-1">GESTION UNIVERSITAIRE</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 rounded-xl transition-preset group
                                ${isActive
                                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                    : 'text-gray-300 hover:bg-secondary hover:text-white'}
                            `}
                        >
                            <item.icon className={`mr-4 text-lg ${location.pathname === item.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-secondary mt-auto">
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-preset group"
                    >
                        <FaSignOutAlt className="mr-4 group-hover:animate-pulse" />
                        <span className="font-medium">Déconnexion</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
