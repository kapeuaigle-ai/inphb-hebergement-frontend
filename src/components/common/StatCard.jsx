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
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-50">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-text-secondary">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-text-primary">{value}</h3>
                    {trend && (
                        <p className={`text-xs mt-2 font-medium ${trend.positive ? 'text-success' : 'text-danger'}`}>
                            {trend.positive ? '↑' : '↓'} {trend.value}% <span className="text-gray-400 font-normal ml-1">vs mois dernier</span>
                        </p>
                    )}
                </div>
                <div className={`p-4 rounded-xl ${colorVariants[color]} flex items-center justify-center`}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
