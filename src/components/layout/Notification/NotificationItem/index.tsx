import React from "react";
import {Notification} from "../../../../types";
import {cn} from "../../../../utils";
import {Button} from "../../../ui/Button.tsx";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {format} from "date-fns";

export const NotificationItem: React.FC<{
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