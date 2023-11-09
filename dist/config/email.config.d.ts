declare const _default: (() => {
    transport: {
        host: string;
        port: number;
        secure: string;
        auth: {
            user: string;
            pass: string;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    transport: {
        host: string;
        port: number;
        secure: string;
        auth: {
            user: string;
            pass: string;
        };
    };
}>;
export default _default;
