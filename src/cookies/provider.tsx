import type { ReactNode } from 'react';

import UniversalCookies from 'universal-cookie';

import { Provider } from './context';

export type CookiesProviderProps = {
    children?: ReactNode;
};

export default function CookiesProvider(props: CookiesProviderProps) {
    const cookies = new UniversalCookies();

    return <Provider value={cookies}>{props.children}</Provider>;
}
