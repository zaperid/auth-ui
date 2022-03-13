import type { ReactElement } from 'react';

import router from 'next/router';

import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import SecurityIcon from '@mui/icons-material/Security';

import Layout from '@components/layout/Dashboard';

export default function Menu() {
    const open = (url: string) => {
        return () => router.push(url);
    };
    return (
        <Stack spacing={2}>
            <Paper>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={open('/dashboard/')}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
            <Paper>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={open('/dashboard/profile')}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={open('/dashboard/security')}>
                            <ListItemIcon>
                                <SecurityIcon />
                            </ListItemIcon>
                            <ListItemText primary="Security" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bank" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
            <Paper>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonalVideoIcon />
                            </ListItemIcon>
                            <ListItemText primary="Theme" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notification" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
            <Paper>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Activity" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Application" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
            <Paper>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={open('/dashboard/logout')}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Paper>
        </Stack>
    );
}

Menu.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
