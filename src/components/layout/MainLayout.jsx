import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-bg-primary">
            <Sidebar />
            <div className="flex-1 lg:ml-64 flex flex-col">
                <Navbar />
                <main className="p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
