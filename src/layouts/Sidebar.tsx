import React from 'react';
import { cn } from '../utils/cn';
import { 
  InboxIcon, 
  StarIcon, 
  CalendarIcon, 
  // UserGroupIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/ui/Button';

interface NavItemProps {
    icon: React.ReactElement<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
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
      {React.cloneElement(icon, { className: "h-5 w-5" })}
      <span>{label}</span>
    </button>
  );
};

export const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('My Tasks');

  const handleNavClick = (item: string) => {
    setActiveItem(item);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-[hsl(var(--foreground))]">Todo App</h2>
        
        <nav className="space-y-1">
          <NavItem 
            icon={<InboxIcon />} 
            label="My Tasks" 
            active={activeItem === 'My Tasks'} 
            onClick={() => handleNavClick('My Tasks')}
          />
          <NavItem 
            icon={<StarIcon />} 
            label="Important" 
            active={activeItem === 'Important'} 
            onClick={() => handleNavClick('Important')}
          />
          <NavItem 
            icon={<CalendarIcon />} 
            label="Planned" 
            active={activeItem === 'Planned'} 
            onClick={() => handleNavClick('Planned')}
          />
          {/*<NavItem */}
          {/*  icon={<UserGroupIcon />} */}
          {/*  label="Assigned" */}
          {/*  active={activeItem === 'Assigned'} */}
          {/*  onClick={() => handleNavClick('Assigned')}*/}
          {/*/>*/}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-[hsl(var(--border))]">
        <Button className="w-full flex items-center justify-center gap-2">
          <PlusIcon className="h-4 w-4" />
          <span>New List</span>
        </Button>
      </div>
    </div>
  );
};

