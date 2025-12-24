import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';

const Navbar = ({ pageTitle = 'Tableau de bord' }) => {
    const { user } = useAuth();

    return (
        <header className="h-14 sm:h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-3 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-12 flex-1">
                {/* Page Title - Mobile Optimized */}
                <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-text-primary truncate max-w-[140px] sm:max-w-none">
                    {pageTitle}
                </h2>

                {/* Search Bar - Hidden on mobile */}
                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Recherche rapide..."
                        className="w-80 bg-gray-50 border-none rounded-full px-12 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-preset"
                    />
                    <FaSearch className="absolute left-4 top-2.5 text-gray-400" />
                </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-6">
                {/* Notification Bell - Visible on mobile */}
                <button className="relative p-2 text-gray-400 hover:text-primary transition-preset">
                    <FaBell size={18} className="sm:hidden" />
                    <FaBell size={20} className="hidden sm:block" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Divider - Hidden on mobile */}
                <div className="h-6 sm:h-8 w-px bg-gray-100 hidden sm:block"></div>

                {/* User Info */}
                <div className="flex items-center space-x-2 lg:space-x-3">
                    {/* User Name - Hidden on mobile */}
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-text-primary leading-none truncate max-w-[120px]">
                            {user?.nom || 'Utilisateur'}
                        </p>
                        <p className="text-[10px] text-text-secondary font-medium mt-1 uppercase tracking-wider">
                            {user?.role === 'ADMIN' ? 'Admin' : 'Gestion'}
                        </p>
                    </div>
                    {/* User Avatar */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-md">
                        <FaUserCircle size={20} className="sm:hidden" />
                        <FaUserCircle size={24} className="hidden sm:block lg:hidden" />
                        <FaUserCircle size={28} className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
