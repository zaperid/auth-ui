import type { ReactElement } from 'react';

import Button from '@mui/material/Button';

import Layout from '@components/layout/Dashboard';

export default function Index() {
    return <Button>Hello, world!</Button>;
}

Index.getLayout = function getLayout(page: ReactElement) {
    return <Layout title="Dashboard">{page}</Layout>;
};
