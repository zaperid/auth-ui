import router from 'next/router';

import cookies from '@libs/cookies';

export default function Logout() {
    const cookieToken = cookies.Token();

    cookieToken.Remove();

    router.push('/login');

    return null;
}
