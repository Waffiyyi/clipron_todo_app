import React from 'react';
import {BellIcon, ExclamationCircleIcon} from '@heroicons/react/24/outline';
import {Button} from '../../ui/Button.tsx';
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useDeleteNotificationMutation
} from '../../../services/api.ts';
import {useAuth} from '../../../hooks/useAuth.ts';
import LoaderOrError from "../../LoaderOrError.tsx";
import {NotificationItem} from "./NotificationItem";



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
    const icon = <ExclamationCircleIcon className="h-12 w-12 mb-4"/>;

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
                    {(isLoading || error) ? (
                        <LoaderOrError
                            isLoading={isLoading}
                            error={!!error}
                            icon={icon}
                            message="Error loading notifications"
                        />
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