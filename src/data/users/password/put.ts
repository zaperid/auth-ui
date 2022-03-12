import axios from 'axios';

import config from '@config';

export type PasswordPutRequest = {
    captcha_token: string;
    captcha_answer: string;
    current_password: string;
    new_password: string;
    new_password_confirm: string;
};

export type PasswordPutResponse = {
    error: string;
};

export function PasswordPut(req: PasswordPutRequest) {
    return axios.request<PasswordPutResponse>({
        baseURL: config.ApiHost,
        url: '/api/v1/users/password',
        method: 'put',
        data: req,
    });
}
