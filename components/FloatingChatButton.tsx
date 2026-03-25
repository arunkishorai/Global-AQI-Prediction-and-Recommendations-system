
import React from 'react';
import { SparklesIcon } from './icons';

interface FloatingChatButtonProps {
    onClick: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40 h-14 w-14 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-lg hover:bg-cyan-500 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Open Aura Assistant"
        >
            <SparklesIcon className="h-7 w-7" />
        </button>
    );
};
