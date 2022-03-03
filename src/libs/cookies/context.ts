import { createContext } from 'react';

import UniversalCookies from 'universal-cookie';

const CookiesContext = createContext(new UniversalCookies());

export const { Provider, Consumer } = CookiesContext;
export default CookiesContext;
