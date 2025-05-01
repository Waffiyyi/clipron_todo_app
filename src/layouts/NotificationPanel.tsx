import React from 'react';
import {cn} from '../utils/cn';
import {BellIcon, ExclamationCircleIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {format} from 'date-fns';
import {Button} from '../components/ui/Button';
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useDeleteNotificationMutation
} from '../services/api.ts';
import {useAuth} from '../hooks/useAuth.ts';
import {Notification} from '../types';

const NotificationItem: React.FC<{
    notification: Notification;
    onDelete: (id: string) => void;
}> = ({notification, onDelete}) => {
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
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onDelete(notification.id)}
                >
                    <XMarkIcon className="h-4 w-4 cursor-pointer"/>
                </Button >
            </div >
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{notification.message}</p >
            <div className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                {format(notification.createdAt, 'MMM d, h:mm a')}
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
        refetch
    } = useGetNotificationsQuery(userId || '', {
        skip: !userId,
        pollingInterval: 3600000,
    });

    console.log("notifications", notifications);

    const hasNewNotifications = notifications.some((n) => !n.read);

    const [markAllAsRead] = useMarkNotificationAsReadMutation();
    const [deleteNotification] = useDeleteNotificationMutation();

    const handleMarkAllAsRead = () => {
        if (!userId) return;
        markAllAsRead(userId)
            .unwrap()
            .then(() => refetch())
            .catch((e) => console.error("Failed to mark all as read", e));
    };


    const handleDelete = (id: string) => {
        deleteNotification(id)
            .unwrap()
            .then(() => refetch())
            .catch((e) => console.error("Failed to delete notification", e));
    };

    return (
        <div className="block border-l border-[hsl(var(--border))] overflow-auto max-h-screen">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Notifications</h2 >
                        {hasNewNotifications && (
                            <div className="ml-2 h-2 w-2 rounded-full bg-[hsl(var(--primary))]"/>
                        )}
                    </div >
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                    >
                        Mark all read
                    </Button >
                </div >

                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[50vh]">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[hsl(var(--primary))] border-t-transparent"/>
                        </div >
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-[hsl(var(--muted-foreground))]">
                            <ExclamationCircleIcon className="h-12 w-12 mb-4"/>
                            <p >Error loading notifications</p >
                        </div >
                    ) : notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="text-center p-6">
                            <BellIcon className="h-10 w-10 mx-auto mb-2 text-[hsl(var(--muted-foreground))]"/>
                            <p className="text-[hsl(var(--muted-foreground))]">No
                                                                               notifications
                                                                               yet</p >
                        </div >
                    )}
                </div >
            </div >
        </div >
    );
};