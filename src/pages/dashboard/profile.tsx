import { ReactElement, useState, useMemo } from 'react';

import { useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import LoadingButton from '@mui/lab/LoadingButton';

import Layout from '@components/layout/Dashboard';

import dataProfile, { ProfilePutResponse } from '@data/users/profile';

import cookies from '@libs/cookies';

export default function Profile() {
    const { handleSubmit, register } = useForm();

    const [profileUpdateLoading, setProfileUpdateLoading] =
        useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<boolean>(false);

    const cookieToken = cookies.Token();

    const data = dataProfile.Get({
        token: cookieToken.Get(),
        firstname: true,
        lastname: true,
        email: true,
    });

    const submitHandler = (req: any) => {
        setSuccess(false);
        setError(undefined);
        setProfileUpdateLoading(true);

        req.token = cookieToken.Get();

        dataProfile
            .Put(req)
            .then((res) => {
                resHandler(res.data);
            })
            .catch(() => {
                setError('something wrong');
            })
            .finally(() => setProfileUpdateLoading(false));
    };

    const resHandler = (res: ProfilePutResponse) => {
        setError(res.error);
        if (res.error != undefined) {
            return;
        }

        setSuccess(true);
    };

    const errorAlert = useMemo(() => {
        if (error == undefined) return;

        return <Alert severity="error">{error}</Alert>;
    }, [error]);

    const successAlert = useMemo(() => {
        if (!success) return;

        return (
            <Alert severity="success">
                Update successful. Please wait for changes.
            </Alert>
        );
    }, [success]);

    return (
        <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Avatar
                        alt="Change profile picture"
                        sx={{ width: 100, height: 100 }}
                    />
                </Paper>
            </Grid>
            <Grid item md={8} xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        width: '100%',
                    }}
                >
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Stack spacing={2}>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} xs={12}>
                                        {!data ? (
                                            <Skeleton>
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            <TextField
                                                {...register('firstname')}
                                                label="First Name"
                                                defaultValue={data.firstname}
                                                fullWidth
                                                required
                                            />
                                        )}
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        {!data ? (
                                            <Skeleton>
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            <TextField
                                                {...register('lastname')}
                                                label="Last Name"
                                                defaultValue={data.lastname}
                                                fullWidth
                                                required
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {!data ? (
                                            <Skeleton>
                                                <TextField fullWidth />
                                            </Skeleton>
                                        ) : (
                                            <TextField
                                                {...register('email')}
                                                label="Email"
                                                defaultValue={data.email}
                                                fullWidth
                                                required
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                            {errorAlert}
                            {successAlert}
                            {!data ? undefined : (
                                <LoadingButton
                                    type="submit"
                                    loading={profileUpdateLoading}
                                    variant="contained"
                                >
                                    Update
                                </LoadingButton>
                            )}
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return <Layout title="Profile">{page}</Layout>;
};
