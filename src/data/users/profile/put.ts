import axios from 'axios';

import config from '@config';

export type ProfilePutRequest = {
    token: string;
    firstname: string;
    lastname: string;
    email: string;
};

export type ProfilePutResponse = {
    error: string;
};

export function ProfilePut(req: ProfilePutRequest) {
    return axios.request<ProfilePutResponse>({
        baseURL: config.ApiHost,
        url: '/api/v1/users/profile',
        method: 'put',
        data: req,
    });
}
