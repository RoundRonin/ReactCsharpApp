import axios from 'axios';
import { APIError } from '@/Domain';
import { getApiBaseUrl } from '../utils/';
import { APIInterface } from '../interfaces';

export class API implements APIInterface {
    public async fetchData(endpoint: string, options?: any) {
        console.log(options)
        try {
            let baseUrl = getApiBaseUrl();
            const response = await axios({
                url: `${baseUrl}${endpoint}`,
                ...options,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error)
                const status = error.response?.status || 0;

                const message =
                    error.response?.data?.message || error.message || 'Unknown error';

                if (status >= 400 && status < 500) {
                    throw new Error(`Client error: ${message}`);
                } else if (status >= 500) {
                    throw new Error(`Server error. Please try again later.`);
                }
            }

            throw new Error('An unexpected error occurred.');
        }
    }
}