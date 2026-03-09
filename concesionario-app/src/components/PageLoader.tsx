import React from 'react';
import './PageLoader.css';

interface PageLoaderProps {
    isLoading: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
    return (
        <div className={`loader-overlay ${isLoading ? 'active' : ''}`}>
            <div className="turbo-spinner"></div>
            <p className="loader-text">Sincronizando boxes...</p>
        </div>
    );
};