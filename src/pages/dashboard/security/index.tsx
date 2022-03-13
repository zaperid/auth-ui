import type { ReactElement } from 'react';

import router from 'next/router';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import PasswordIcon from '@mui/icons-material/Password';

import Layout from '@components/layout/Dashboard';

export default function Security() {
    const open = (url: string) => {
        return () => router.push(url);
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={open('/dashboard/security/change_password')}
                    >
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Change Password" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Paper>
    );
}

Security.getLayout = function getLayout(page: ReactElement) {
    return <Layout title="Security">{page}</Layout>;
};
