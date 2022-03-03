import { useContext } from 'react';

import { CookieSetOptions } from 'universal-cookie';

import CookiesContext from './context';

export type CookieController = {
    Get: () => any;
    Set: (value: any, options?: CookieSetOptions) => void;
    Remove: (options?: CookieSetOptions) => void;
};

export default function GenerateController(
    name: string
): () => CookieController {
    return () => {
        const cookies = useContext(CookiesContext);

        const Get = () => cookies.get(name);
        const Set = (value: any, options?: CookieSetOptions) =>
            cookies.set(name, value, options);
        const Remove = (options?: CookieSetOptions) =>
            cookies.remove(name, options);

        return {
            Get: Get,
            Set: Set,
            Remove: Remove,
        };
    };
}
