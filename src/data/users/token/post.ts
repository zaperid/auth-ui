import axios from 'axios';

import config from '@config';

export type TokenPostRequest = {
    captcha_token: string;
    captcha_answer: string;
    username: string;
    password: string;
};

export type TokenPostResponse = {
    token: string;
    error: string;
};

export function TokenPost(req: TokenPostRequest) {
    return axios.request<TokenPostResponse>({
        baseURL: config.ApiHost,
        url: '/api/v1/users/token',
        method: 'post',
        data: req,
    });
}
