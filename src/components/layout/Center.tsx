import { ReactNode } from 'react';

import Box from '@mui/material/Box';

export type ContainerProps = {
    children: ReactNode;
};

export default function Center(props: ContainerProps) {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {props.children}
        </Box>
    );
}
