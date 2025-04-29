import React from 'react';
import { cn } from '../utils/cn';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Task Due Soon',
    description: 'Your task "Complete project proposal" is due in 2 hours',
    timestamp: new Date(),
    read: false
  },
  {
    id: '2',
    title: 'New Assignment',
    description: 'You have been assigned a new task by John',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false
  },
  {
    id: '3',
    title: 'Task Completed',
    description: 'Great job! You completed "Update documentation"',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={cn(
      "p-3 rounded-lg border border-[hsl(var(--border))]",
      "hover:bg-[hsl(var(--accent))] transition-colors",
      !notification.read && "border-l-4 border-l-[hsl(var(--primary))]"
    )}>
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-[hsl(var(--foreground))]">{notification.title}</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <XMarkIcon className="h-4 w-4 cursor-pointer" />
        </Button>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{notification.description}</p>
      <div className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
        {format(notification.timestamp, 'MMM d, h:mm a')}
      </div>
    </div>
  );
};

export const NotificationPanel: React.FC = () => {
  const [hasNewNotifications] = React.useState(true);
  
  return (
    <div className="block border-l border-[hsl(var(--border))] ">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Notifications</h2>
            {hasNewNotifications && (
              <div className="ml-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))]"></div>
            )}
          </div>
          <Button variant="ghost" size="sm">Mark all read</Button>
        </div>
        
        <div className="space-y-3">
          {mockNotifications.length > 0 ? (
            mockNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center p-6">
              <BellIcon className="h-10 w-10 mx-auto mb-2 text-[hsl(var(--muted-foreground))]" />
              <p className="text-[hsl(var(--muted-foreground))]">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

