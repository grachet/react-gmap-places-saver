import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'nokia.onmicrosoft.com',
  clientId: '576e147d-05f1-4ba4-860e-a2d66d55dda9',
  endpoints: {
    api: 'https://nokia.onmicrosoft.com/f366ac0f-c726-4bb5-8a71-c3ab345b1e01',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);