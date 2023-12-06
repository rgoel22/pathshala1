import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const MainLoading = ({ imageSrc, children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isFirstLoad = sessionStorage.getItem('isFirstLoad');

        if (!isFirstLoad) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('isFirstLoad', 'false');
                setIsLoading(false);
            }, 2000); // 2 seconds

            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>
                    <img src={imageSrc} alt="Loading" style={{ width: '100%' }} />
                    <Loading />
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default MainLoading;
