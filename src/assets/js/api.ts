import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';

export type { CancelTokenSource };

class Api {
    private instance: AxiosInstance;
    private cancelTokenSource: CancelTokenSource | null = null;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 20000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.instance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        this.instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (axios.isCancel(error)) {
                // La solicitud ha sido cancelada
                console.log('Solicitud:', error.message);
            } else if (error.response && error.response.status === 401) {
                // Redirigir al usuario a la página de inicio de sesión
                //window.location.href = '/login';
            }

            return Promise.reject(error);
        });
    }

    public get<T = any>(url: string, params?: any): Promise<AxiosResponse<T, any>> {
        this.cancelTokenSource = axios.CancelToken.source();

        return this.instance.get<T>(url, {
            ...params,
            cancelToken:  this.cancelTokenSource.token,
        });
    }

    public post<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>> {
        this.cancelTokenSource = axios.CancelToken.source();

        return this.instance.post<T>(url, data, {
            cancelToken: this.cancelTokenSource.token,
        });
    }

    public put<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>> {
        this.cancelTokenSource = axios.CancelToken.source();

        return this.instance.put<T>(url, data, {
            cancelToken: this.cancelTokenSource.token,
        });
    }

    public delete<T = any>(url: string, data?: any): Promise<AxiosResponse<T, any>> {
        this.cancelTokenSource = axios.CancelToken.source();

        return this.instance.delete<T>(url, {
            data,
            cancelToken: this.cancelTokenSource.token,
        });
    }

    // Agregar un método para obtener la instancia del CancelTokenSource
    public getCancelTokenSource(): CancelTokenSource {
        return axios.CancelToken.source();
    }

    // Agrega un método para verificar si la solicitud fue cancelada
    public isCancel(error: any): boolean {
        return axios.isCancel(error);
    }

    public cancelRequest(): void {
        if (this.cancelTokenSource) {
            this.cancelTokenSource.cancel('La solicitud ha sido cancelada');
        }
    }
}

export default new Api();
