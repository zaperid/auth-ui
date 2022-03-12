import axios from 'axios';
import useSWR from 'swr';

import config from '@config';

export type ProfileGetRequest = {
    token: string;
    firstname?: boolean;
    lastname?: boolean;
    email?: boolean;
};

export type ProfileGetResponse = {
    error: string;
    firstname: string;
    lastname: string;
    email: string;
};

export function ProfileGet(
    req: ProfileGetRequest
): ProfileGetResponse | undefined {
    const fetcher = (req: ProfileGetRequest) =>
        axios
            .request<ProfileGetResponse>({
                baseURL: config.ApiHost,
                url: '/api/v1/users/profile',
                method: 'get',
                params: req,
            })
            .then((res) => res.data);

    const { data } = useSWR<ProfileGetResponse>(req, fetcher);

    return data;
}
