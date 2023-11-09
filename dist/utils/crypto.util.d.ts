/// <reference types="node" />
import { LlavesDto } from '@/modules/companies/dto';
import { Encoding } from 'node:crypto';
export declare const encode: {
    [key: string]: Encoding;
};
export declare function encrypt(inputString: any, secretCryptoKey: any): string;
export declare function decrypt(encryptedString: any, secretCryptoKey: any): string | null;
export declare function encryptKeys({ api, publica, privada }: LlavesDto, secretCryptoKey: string): LlavesDto;
