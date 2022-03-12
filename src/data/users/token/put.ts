import axios from 'axios';

import config from '@config';

export type TokenPutRequest = {
    token: string;
};

export type TokenPutResponse = {
    error: string;
    token: string;
};

export function TokenPut(req: TokenPutRequest) {
    return axios.request<TokenPutResponse>({
        baseURL: config.ApiHost,
        url: '/api/v1/users/token',
        method: 'put',
        data: req,
    });
}
