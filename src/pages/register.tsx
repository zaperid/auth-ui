import type { ReactElement } from 'react';
import { useState, useMemo } from 'react';

import { useForm } from 'react-hook-form';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';

import Layout from '@components/layout/Center';
import Captcha from '@components/Captcha';
import users, { UsersPostResponse } from '@data/users';

export default function Register() {
    const { handleSubmit, register } = useForm();

    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<boolean>(false);

    const submitHandler = (req: any) => {
        setLoading(true);
        setError(undefined);
        setSuccess(false);

        req.captcha_token = captchaToken;
        users
            .Post(req)
            .then((res) => resHandler(res.data))
            .catch(() => setError('somthing wrong'))
            .finally(() => setLoading(false));
    };

    const resHandler = (res: UsersPostResponse) => {
        setError(res.error);
        if (res.error == undefined) return;

        setSuccess(true);
    };

    const errorAlert = useMemo(() => {
        if (error == undefined) return;

        return <Alert severity="error">{error}</Alert>;
    }, [error]);

    const successAlert = useMemo(() => {
        if (!success) return;

        return <Alert severity="success">user created successfuly.</Alert>;
    }, [success]);

    return (
        <Paper variant="outlined" sx={{ p: 2, width: 300 }}>
            <Backdrop open={loading}></Backdrop>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Stack spacing={2}>
                    <Typography variant="h4" component="h1">
                        Register
                    </Typography>
                    <TextField
                        {...register('username')}
                        label="Username / Email"
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
                    <TextField
                        {...register('password_confirm')}
                        label="Password Confirm"
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
                    {errorAlert}
                    {successAlert}
                    <Button
                        type="submit"
                        disabled={loading}
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

Register.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
