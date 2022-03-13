import { ReactElement, useEffect, useMemo } from 'react';

import router from 'next/router';

import jwt_decode from 'jwt-decode';

import moment from 'moment';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import dataToken from '@data/users/token';

import cookies from '@libs/cookies';

import Header from './header';

export type DashboardProps = {
    children: ReactElement;
    title?: string;
};

export default function Dashboard(props: DashboardProps) {
    const tokenCookie = cookies.Token();

    useEffect(() => {
        const token = tokenCookie.Get();
        if (token == undefined) {
            router.push('/login');
            return;
        }

        const updateToken = () => {
            const token = tokenCookie.Get();

            dataToken.Put({ token: token }).then((res) => {
                const { exp } = jwt_decode<{ exp: number }>(res.data.token);
                tokenCookie.Set(res.data.token, {
                    expires: new Date(exp * 1e3),
                });
            });
        };

        const duration = moment.duration(3, 'days');

        const { exp } = jwt_decode<{ exp: number }>(token);
        let interval = moment.unix(exp).subtract(duration).diff(moment());
        if (interval < 0) {
            interval = 0;
        }

        let refresh = setInterval(() => {
            updateToken();

            clearInterval(refresh);
            interval = duration.asMilliseconds();

            refresh = setInterval(() => {
                updateToken();
            }, interval);
        }, interval);

        return () => {
            clearInterval(refresh);
        };
    }, []);

    const openMenu = () => {
        router.push('/dashboard/menu');
    };

    const title = useMemo(() => {
        if (props.title == undefined) return;

        return (
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                {props.title}
            </Typography>
        );
    }, [props.title]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header onMenuClick={openMenu} />
            <Container component="main" sx={{ p: 2 }}>
                <Toolbar />
                {title}
                {props.children}
            </Container>
        </Box>
    );
}
