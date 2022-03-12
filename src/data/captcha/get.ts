import { useState, useEffect } from 'react';

import axios from 'axios';

import config from '@config';

export type CaptchaGetRequest = {
    height: number;
    width: number;
};

export type CaptchaGetResponse = CaptchaGetData | undefined;

export type CaptchaGetData = {
    captcha_token: string;
    image: string;
    error: string;
};

export function CaptchaGet(
    req: CaptchaGetRequest
): [CaptchaGetResponse, () => void] {
    const [res, setRes] = useState<CaptchaGetResponse>(undefined);

    const load = () => {
        axios
            .request<CaptchaGetData>({
                baseURL: config.ApiHost,
                url: '/api/v1/captcha',
                method: 'get',
                params: req,
            })
            .then((res) => setRes(res.data))
            .catch((res) => setRes(res.data));
    };

    useEffect(load, []);
    useEffect(() => {
        const tiemout = setTimeout(load, 30 * 1000);
        return () => clearTimeout(tiemout);
    }, [res]);

    return [res, load];
}
