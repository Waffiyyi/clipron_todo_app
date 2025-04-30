import React from 'react';
import {cn} from '../utils/cn';
import {BellIcon, ExclamationCircleIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {format} from 'date-fns';
import {Button} from '../components/ui/Button';
import {useGetNotificationsQuery} from "../services/api.ts";
import {useAuth} from "../hooks/useAuth.ts";
import {Notification} from "../types";
// Mock notifications data
const mockNotifications: Notification[] = [
    {
        id: '1',
        sent:true,
        todo: {
            id: "3",
            title: 'New Assignment',
        },
        message: 'You have been assigned a new task by John',
        notifyAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
    },
    {
        id: '2',
        sent:true,
        todo: {
            id: "1",
            title: 'New Assignment',
        },
        message: 'You have been assigned a new task by John',
        notifyAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
    },
    {
        id: '3',
        sent:true,
        todo: {
            id: "2",
            title: 'New Assignment',
        },
        message: 'You have been assigned a new task by John',
        notifyAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
    },
];

const NotificationItem: React.FC<{
    notification: Notification
}> = ({notification}) => {
    return (
        <div
            className={cn(
                "p-3 rounded-lg border border-[hsl(var(--border))]",
                "hover:bg-[hsl(var(--accent))] transition-colors",
                !notification.read && "border-l-4 border-l-[hsl(var(--primary))]"
            )}
        >
            <div className="flex justify-between items-start">
                <h3 className="font-medium text-[hsl(var(--foreground))]">{notification.todo?.title}</h3 >
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <XMarkIcon className="h-4 w-4 cursor-pointer"/>
                </Button >
            </div >
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{notification.message}</p >
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                {format(notification.notifyAt, 'MMM d, h:mm a')}
            </div >
        </div >
    );
};

export const NotificationPanel: React.FC = () => {
    const {user} = useAuth();
    const userId = user?.id;
    const {
        data: notifications = [],
        isLoading,
        error,
    } = useGetNotificationsQuery(userId || '', {
        skip: !userId,
        pollingInterval: 30000,
    });

    const hasNewNotifications = notifications.some((n) => !n.read) ;

    return (
        <div className="block border-l border-[hsl(var(--border))] ">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Notifications</h2 >
                        {hasNewNotifications && (
                            <div className="ml-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))]"></div >
                        )}
                    </div >
                    <Button variant="ghost" size="sm">Mark all read</Button >
                </div >


                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[50vh]">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[hsl(var(--primary))] border-t-transparent"/>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-[hsl(var(--muted-foreground))]">
                            <ExclamationCircleIcon className="h-12 w-12 mb-4"/>
                            <p>Error loading notifications</p>
                        </div>
                    ) : notifications.length > 0 ? (
                        mockNotifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))
                    ) : (
                        <div className="text-center p-6">
                            <BellIcon className="h-10 w-10 mx-auto mb-2 text-[hsl(var(--muted-foreground))]"/>
                            <p className="text-[hsl(var(--muted-foreground))]">No notifications yet</p>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

