import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children, pageTitle }) => {
    return (
        <div className="flex min-h-screen bg-bg-primary">
            <Sidebar />
            {/* Main Content - Optimized for mobile */}
            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <Navbar pageTitle={pageTitle} />
                {/* Main Content Area - iPhone 12 safe spacing */}
                <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pb-safe">
                    {/* Content Container - Max width and smooth animations */}
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
