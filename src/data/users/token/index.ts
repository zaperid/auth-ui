export * from './post';
export * from './put';

import { TokenPost } from './post';
import { TokenPut } from './put';

export default {
    Post: TokenPost,
    Put: TokenPut,
};
