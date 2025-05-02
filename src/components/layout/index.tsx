import React, { useState } from 'react';
import { cn } from '../../utils/cn.ts';
import { Header } from './Header';
import { NotificationPanel } from './Notification';
import {Sidebar} from "./Sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileNotificationsOpen, setIsMobileNotificationsOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const toggleMobileNotifications = () => {
        setIsMobileNotificationsOpen(prev => !prev);
    };

    return (
        <div className="flex min-h-screen bg-[hsl(var(--background))]">
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={cn(
                "fixed inset-y-0 left-0 z-30 w-64 bg-[hsl(var(--background))] transform transition-transform duration-200 ease-in-out md:hidden",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar />
            </div>

            <div className="hidden md:block w-64 border-r border-[hsl(var(--border))]">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col relative overflow-hidden">
                <Header
                    toggleMobileMenu={toggleMobileMenu}
                    toggleMobileNotifications={toggleMobileNotifications}
                />

                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </main>
            </div>

            <div className="hidden lg:block w-80 border-l border-[hsl(var(--border))]">
                <NotificationPanel />
            </div>

            {isMobileNotificationsOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMobileNotificationsOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 w-80 bg-[hsl(var(--background))] shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden">
                        <NotificationPanel />
                    </div>
                </>
            )}
        </div>
    );
};