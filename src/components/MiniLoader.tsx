import React from 'react';

interface MiniLoaderProps {
    size?: number;
    colorClass?: string;
}

const MiniLoader: React.FC<MiniLoaderProps> = ({
                                                   size = 20,
                                                   colorClass = 'border-[hsl(var(--primary))]',
                                               }) => {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-t-transparent ${colorClass}`}
            style={{
                width: size,
                height: size,
            }}
            role="status"
            aria-label="loading"
        />
    );
};

export default MiniLoader;