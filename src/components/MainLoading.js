import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { Container } from '@mui/material';


const MainLoading = ({ imageSrc, children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isFirstLoad = sessionStorage.getItem('isFirstLoad');

        if (!isFirstLoad) {
            const timer = setTimeout(() => {
                sessionStorage.setItem('isFirstLoad', 'false');
                setIsLoading(false);
            }, 2500); // 2 seconds

            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <div>
            {isLoading ? (
                <Container style={{overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>
                    <img src={imageSrc} alt="Loading" style={{ width: '70%', height:'70%', objectFit:'cover' }} />
                    <Loading />
                </Container>
            ) : (
                children
            )}
        </div>
    );
};

export default MainLoading;
