import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-50 animate-fadeOut">
        <div className="relative">
        <div className="w-24 h-24">
            {[...Array(3)].map((_, i) => (
            <span
                key={i}
                className="absolute w-full h-full border-4 rounded-full animate-ripple"
                style={{
                borderColor: 'transparent',
                borderLeftColor: i === 0 ? '#A855F7' : i === 1 ? '#BE5EF7' : '#DB2777',
                animationDelay: `${i * 0.3}s`,
                }}
            />
            ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-text">LA</span>
        </div>
        </div>
    </div>
    );
};

export default LoadingScreen;