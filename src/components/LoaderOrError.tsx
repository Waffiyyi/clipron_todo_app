import React from 'react';

interface LoaderOrErrorProps {
    isLoading: boolean;
    error?: boolean;
    message?: string;
    compact?: boolean;
    icon?: React.ReactNode;
}

export const LoaderOrError: React.FC<LoaderOrErrorProps> = ({
                                                         isLoading,
                                                         error,
                                                         message = "Error loading data",
                                                         compact = false,
                                                         icon,
                                                     }) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-[hsl(var(--primary))] border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return compact ? (
            <p className="text-center text-sm text-red-500">{message}</p>
        ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-[hsl(var(--muted-foreground))]">
                {icon && <div className="mb-4">{icon}</div>}
                <p>{message}</p>
            </div>
        );
    }

    return null;
};

export default LoaderOrError;