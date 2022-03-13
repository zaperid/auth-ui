import type { ReactElement } from 'react';
import { useState, useMemo } from 'react';

import router from 'next/router';

import { useForm } from 'react-hook-form';

import jwt_decode from 'jwt-decode';

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import Layout from '@components/layout/Center';
import Captcha from '@components/Captcha';

import token, { TokenPostResponse } from '@data/users/token';

import cookies from '@libs/cookies';

export default function Login() {
    const { handleSubmit, register } = useForm();
    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const submitHandler = (req: any) => {
        setLoading(true);
        setError(undefined);

        req.captcha_token = captchaToken;

        token
            .Post(req)
            .then((res) => resHandler(res.data))
            .catch(() => setError('somthing wrong'))
            .finally(() => setLoading(false));
    };

    const tokenCookie = cookies.Token();

    const resHandler = (res: TokenPostResponse) => {
        setError(res.error);
        if (res.error != undefined) return;

        const decodedToken = jwt_decode<{ exp: number }>(res.token);
        tokenCookie.Set(res.token, {
            expires: new Date(decodedToken.exp * 1e3),
        });

        router.push('/dashboard/');
    };

    const alert = useMemo(() => {
        if (error == undefined) return;

        return <Alert severity="error">{error}</Alert>;
    }, [error]);

    return (
        <Paper variant="outlined" sx={{ p: 2, width: 300 }}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Stack spacing={2}>
                    <Typography variant="h4" component="h1">
                        Login
                    </Typography>
                    <TextField
                        {...register('username')}
                        label="Username"
                        variant="outlined"
                        required
                    />
                    <TextField
                        {...register('password')}
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                    />
                    <Captcha height={60} width={240} onLoad={setCaptchaToken} />
                    <TextField
                        {...register('captcha_answer')}
                        label="Captcha"
                        variant="outlined"
                        required
                    />
                    {alert}
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        variant="contained"
                    >
                        Submit
                    </LoadingButton>
                </Stack>
            </form>
        </Paper>
    );
}

Login.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
