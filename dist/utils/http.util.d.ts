import { CustomFetchOptions } from '@/types/http.types';
import { HttpException } from '@nestjs/common';
export declare const handleHttp: () => {
    get: (url: string, options?: CustomFetchOptions, timeout?: number) => Promise<any>;
    post: (url: string, options?: CustomFetchOptions, timeout?: number) => Promise<any>;
    put: (url: string, options?: CustomFetchOptions, timeout?: number) => Promise<any>;
    del: (url: string, options?: CustomFetchOptions, timeout?: number) => Promise<any>;
};
export declare function getUrl(baseUrl: string, params: Record<string, string>): string;
export declare function createHttpException(error: any, message?: string): HttpException;
