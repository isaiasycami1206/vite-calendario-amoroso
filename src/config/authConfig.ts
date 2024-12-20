// src/config/authConfig.js
import {Configuration, PopupRequest} from '@azure/msal-browser';


export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
        authority: import.meta.env.VITE_MSAL_AUTHORITY,
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
        postLogoutRedirectUri: '/', // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    }
};
// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: import.meta.env.VITE_MSAL_SCOPES.split(',') // ["email", "profile", "User.Read"],
};


// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: import.meta.env.VITE_GRAPH_ME_ENDPOINT
};