import React from 'react';

const AlertBadge = ({ count, type = 'danger' }) => {
    if (count === 0) return null;

    const typeClasses = {
        danger: 'bg-red-500 text-white',
        warning: 'bg-orange-400 text-white',
        success: 'bg-green-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    return (
        <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold shadow-sm ${typeClasses[type]}`}>
            {count > 99 ? '99+' : count}
        </span>
    );
};

export default AlertBadge;
