import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useMsal } from '@azure/msal-react';
import authService from '../services/authService';

import { loginRequest } from '../config/authConfig.ts';

export interface AuthContextProps {
    login: (identified: string, password: string, remember: boolean) => Promise<boolean>;
    loginWithMsal: () => Promise<boolean>;
    logout: () => void;
    isTokenValid: () => boolean;
    isMsalLoggedIn: boolean;
}

interface AuthProviderProps { children: React.ReactNode; }

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('ApiToken') || sessionStorage.getItem('ApiToken'));
    const [isMsalLoggedIn, setIsMsalLoggedIn] = useState<boolean>(localStorage.getItem('isOffice365Login') === 'true');
    const { instance } = useMsal();
    const isTokenValid = useCallback((): boolean => {
        if (!token) return false;

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;

            return decodedToken.exp ? decodedToken.exp > currentTime : false;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }, [token]);

    useEffect(() => {
        if (token && !isTokenValid()) {
            logout();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, isTokenValid]);

    const logout = useCallback(() => {
        //const isOffice365Login = localStorage.getItem('isOffice365Login') === 'true';
        setToken(null);
        localStorage.removeItem('ApiToken');
        sessionStorage.removeItem('ApiToken');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('isOffice365Login');

        /* if (isOffice365Login) {
            instance.logoutPopup().catch((error) => console.error('Logout failed', error));
        } */

        if (isMsalLoggedIn) {
            instance.logoutPopup({
                postLogoutRedirectUri: '/'
            }).catch((error) => console.error('Logout failed', error));
        }
        setIsMsalLoggedIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance]);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;

            if (expirationTime > Date.now()) {
                const remember = localStorage.getItem('remember') === '1';
                const delay = expirationTime - Date.now() - 60000;
                console.log(delay)
                const timeout = setTimeout(() => {
                    authService.refreshToken().then(newToken => {
                        if (newToken) {
                            setToken(newToken);
                            if (remember) {
                                localStorage.setItem('ApiToken', newToken);
                            } else {
                                sessionStorage.setItem('ApiToken', newToken);
                            }
                        } else {
                            logout();
                        }
                    });
                }, delay);

                return () => clearTimeout(timeout);
            } else {
                logout();
            }
        }
    }, [token, logout]);

    const login = async (identified: string, password: string, remember: boolean) => {
        const token = await authService.login(identified, password);

        if (token) {
            setToken(token);
            setIsMsalLoggedIn(false);
            localStorage.setItem('remember', remember ? '1' : '0');

            if (remember) {
                localStorage.setItem('ApiToken', token);
            } else {
                sessionStorage.setItem('ApiToken', token);
            }

            localStorage.removeItem('isOffice365Login');

            return true;
        }

        return false;
    };

    const loginWithMsal = async () => {
        try {
            setIsMsalLoggedIn(true);
            const response = await instance.loginPopup(loginRequest);
            const msalToken = response.accessToken;
            const username = response.account.username;
            setToken(msalToken);
            console.log(response.account.username);


            // Send MSAL token to your backend to get your API personal token
            const apiToken = await authService.loginWithMsal({msalUsername: username, msalToken: msalToken});

            console.log(apiToken)
            if (apiToken) {
                console.log('aquiiii- ----')
                setToken(apiToken);
                setIsMsalLoggedIn(true);
                localStorage.setItem('token', msalToken);
                localStorage.setItem('ApiToken', apiToken);
                localStorage.setItem('isOffice365Login', 'true');

                return true;
            } else {
                logout();

                return false;
            }
        } catch (error) {
            console.error('Login with MSAL failed:', error);

            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ login, loginWithMsal, logout, isTokenValid, isMsalLoggedIn}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
