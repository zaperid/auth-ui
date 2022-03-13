import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import captcha from '@data/captcha';

export type CaptchaProps = {
    height: number;
    width: number;
    onLoad?: (token: string) => void;
};

export default function Captcha(props: CaptchaProps) {
    const [res, refresh] = captcha.Get({
        height: props.height,
        width: props.width,
    });

    useEffect(() => {
        if (res !== undefined && props.onLoad !== undefined) {
            props.onLoad(res.captcha_token);
        }
    }, [res, props]);

    if (!res) {
        return (
            <Skeleton
                variant="rectangular"
                width={props.width}
                height={props.height}
            />
        );
    }

    return (
        <Box
            sx={{
                height: props.height,
                width: props.width,
            }}
            style={{
                backgroundImage: 'url(' + res.image + ')',
            }}
            onClick={refresh}
        />
    );
}
