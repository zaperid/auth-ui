import axios from 'axios';

import config from '@config';

export type UsersPostRequest = {
    captcha_token: string;
    captcha_answer: string;
    username: string;
    password: string;
    password_confirm: string;
};

export type UsersPostResponse = {
    error: string;
};

export function UsersPost(req: UsersPostRequest) {
    return axios.request<UsersPostResponse>({
        baseURL: config.ApiHost,
        url: '/api/v1/users',
        method: 'post',
        data: req,
    });
}
