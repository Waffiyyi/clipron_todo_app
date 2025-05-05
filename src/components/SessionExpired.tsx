import {Button} from './ui/Button';
import React from "react";

interface SessionExpiredProps {
    onConfirm: () => void;
}

export const SessionExpired: React.FC<SessionExpiredProps> = ({onConfirm}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-[hsl(var(--card))] p-6 rounded-xl shadow-xl text-center text-[hsl(var(--foreground))]">
                <h2 className="text-xl font-semibold mb-4">Session Expired</h2 >
                <p className="mb-6">Your session has expired. Please log in
                                    again to continue.</p >
                <Button onClick={onConfirm}>Go to Login</Button >
            </div >
        </div >
    );
};