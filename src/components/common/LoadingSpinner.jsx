import React from 'react';

const LoadingSpinner = ({ size = 'md', fullscreen = false }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-4',
        lg: 'w-16 h-16 border-4'
    };

    const spinner = (
        <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`} />
    );

    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-4">
            {spinner}
        </div>
    );
};

export default LoadingSpinner;
