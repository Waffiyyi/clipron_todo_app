import React from 'react';
import {ArrowRightCircleIcon, Bars3Icon as MenuIcon, MoonIcon, SunIcon} from "@heroicons/react/16/solid";
import {BellIcon} from "@heroicons/react/24/outline";
import { Button } from '../components/ui/Button';
import {useTheme} from "../hooks/useTheme.ts";
import {useAuth} from "../hooks/useAuth.ts";

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
                <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">Tasks</h1>
            </div>

            <div className="flex items-center gap-1">
                {/*<Button*/}
                {/*  variant="ghost"*/}
                {/*  size="icon"*/}
                {/*  onClick={toggleLayout}*/}
                {/*  aria-label="Toggle layout"*/}
                {/*  className="text-[hsl(var(--foreground))]"*/}
                {/*>*/}
                {/*  {layout === 'grid'*/}
                {/*    ? <LinkIcon className="h-5 w-5" />*/}
                {/*    : <LinkSlashIcon className="h-5 w-5" />*/}
                {/*  }*/}
                {/*</Button>*/}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="text-[hsl(var(--foreground))]"
                >
                    {theme === 'dark'
                        ? <SunIcon className="h-5 w-5" />
                        : <MoonIcon className="h-5 w-5" />
                    }
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    aria-label="Logout"
                    className="text-[hsl(var(--foreground))]"
                >
                    <ArrowRightCircleIcon className="h-5 w-5"/>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMobileNotifications}
                    className="lg:hidden p-2 text-[hsl(var(--foreground))]"
                    aria-label="Open Notifications"
                >
                    <BellIcon className="h-5 w-5"/>
                </Button >
            </div>


            {/* Mobile Notification Bell */}

        </header >
    );
};