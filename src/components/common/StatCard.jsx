import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'primary', trend }) => {
    const colorVariants = {
        primary: 'bg-blue-50 text-primary',
        success: 'bg-green-50 text-success',
        danger: 'bg-red-50 text-danger',
        warning: 'bg-orange-50 text-warning',
        info: 'bg-indigo-50 text-info',
    };

    return (
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-50">
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-text-secondary truncate">{title}</p>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mt-0.5 sm:mt-1 text-text-primary">{value}</h3>
                    {trend && (
                        <p className={`text-[9px] sm:text-xs mt-1 sm:mt-2 font-medium ${trend.positive ? 'text-success' : 'text-danger'}`}>
                            {trend.positive ? '↑' : '↓'} {trend.value}%
                            <span className="text-gray-400 font-normal ml-1 hidden sm:inline">vs mois dernier</span>
                        </p>
                    )}
                </div>
                <div className={`p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl ${colorVariants[color]} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className="sm:hidden" />
                    <Icon size={20} className="hidden sm:block lg:hidden" />
                    <Icon size={24} className="hidden lg:block" />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
