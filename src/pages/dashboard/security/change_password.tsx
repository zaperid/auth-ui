import { ReactElement, useState, useMemo } from 'react';

import { useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import Captcha from '@components/Captcha';
import Layout from '@components/layout/Dashboard';

import dataPassword, { PasswordPutResponse } from '@data/users/password';

import cookies from '@libs/cookies';

export default function ChangePassword() {
    const { handleSubmit, register } = useForm();

    const [captchaToken, setCaptchaToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<boolean>(false);

    const cookieToken = cookies.Token();

    const submitHandler = (req: any) => {
        setLoading(true);
        setError(undefined);
        setSuccess(false);

        req.token = cookieToken.Get();
        req.captcha_token = captchaToken;

        dataPassword
            .Put(req)
            .then((res) => resHandler(res.data))
            .catch(() => setError('something wrong'))
            .finally(() => setLoading(false));
    };

    const resHandler = (res: PasswordPutResponse) => {
        setError(res.error);
        if (res.error != undefined) return;

        setSuccess(true);
    };

    const errorAlert = useMemo(() => {
        if (error == undefined) return;

        return <Alert severity="error">{error}</Alert>;
    }, [error]);

    const successAlert = useMemo(() => {
        if (!success) return;

        return <Alert severity="success">Update successful.</Alert>;
    }, [success]);

    return (
        <Paper sx={{ p: 2, width: '100%' }}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Stack spacing={2}>
                    <TextField
                        {...register('current_password')}
                        label="Current Password"
                        type="password"
                        required
                    />
                    <Divider />
                    <TextField
                        {...register('new_password')}
                        label="New Password"
                        type="password"
                        required
                    />
                    <TextField
                        {...register('new_password_confirm')}
                        label="New Password Confirmation"
                        type="password"
                        required
                    />
                    <Divider />
                    <Captcha width={240} height={60} onLoad={setCaptchaToken} />
                    <TextField
                        {...register('captcha_answer')}
                        label="Captcha"
                        required
                    />
                    {errorAlert}
                    {successAlert}
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </LoadingButton>
                </Stack>
            </form>
        </Paper>
    );
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
    return <Layout title="Change Password">{page}</Layout>;
};
