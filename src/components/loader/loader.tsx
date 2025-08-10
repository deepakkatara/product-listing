import React from 'react';
import { Loader } from "rsuite";

interface ApploaderProps {
    className: string;
}

const Apploader: React.FC<ApploaderProps> = ({ className }) => {
    return (
        <>
            <div className={className}>
                <Loader size="md" content="Loading..." />
            </div>
        </>
    );
};

export default Apploader;