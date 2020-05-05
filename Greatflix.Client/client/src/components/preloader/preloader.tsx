import React from 'react';

import './preloader.css';

interface PreloaderProps {
    isLoading?: boolean,
    component?: React.ReactNode
}

const Preloader : React.FC<PreloaderProps> = (props: PreloaderProps) => {
    if (props.isLoading || !props.component) {
        return (
            <span className='loading'>
                <span className='loader' />
            </span>
        )
    } else {
        return (
            <>
                {props.component}
            </>
        );
    }
}

export default Preloader;