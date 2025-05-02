import React from 'react';
import {ArrowLeftEndOnRectangleIcon as LogoutIcon, Bars3Icon as MenuIcon, MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {BellIcon} from "@heroicons/react/24/outline";
import { Button } from '../../ui/Button.tsx';
import {useTheme} from "../../../hooks/useTheme.ts";
import {useAuth} from "../../../hooks/useAuth.ts";

interface HeaderProps {
    toggleMobileMenu: () => void;
    toggleMobileNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                  toggleMobileMenu,
                                                  toggleMobileNotifications
                                              }) => {
    const { theme, toggleTheme } = useTheme();
    const {logout} = useAuth();

    return (
        <header className="h-14 px-4 flex items-center justify-between gap-2 border-b border-[hsl(var(--border))]">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <MenuIcon className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))]">Donezo</h1>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark'
                        ? <SunIcon className="h-6 w-6" />
                        : <MoonIcon className="h-6 w-6" />
                    }
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    aria-label="Logout"
                >
                    <LogoutIcon className="h-6 w-6"/>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileNotifications}
                    className="lg:hidden p-2 ]"
                    aria-label="Open Notifications"
                >
                    <BellIcon className="h-5 w-5"/>
                </Button >
            </div>

        </header >
    );
};