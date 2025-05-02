import React from "react";
import {cn} from "../../../../utils";

interface NavItemProps {
    icon: React.ReactElement<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({icon, label, active, onClick}) => {
    return (
        <button
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left",
                "transition-colors duration-200",
                "hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
                active ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-medium" : "text-[hsl(var(--foreground))]"
            )}
            onClick={onClick}
        >
            {React.cloneElement(icon, {className: "h-6 w-6"})}
            <span >{label}</span >
        </button >
    );
};