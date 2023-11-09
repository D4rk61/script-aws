"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpException = exports.getUrl = exports.handleHttp = void 0;
const common_1 = require("@nestjs/common");
const handleHttp = () => {
    const customFetch = (endpoint, options, timeout) => {
        const defaultHeader = {
            accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method ?? 'GET';
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers }
            : defaultHeader;
        options.body = JSON.stringify(options.body) || false;
        if (!options.body)
            delete options.body;
        setTimeout(() => controller.abort(), timeout);
        return fetch(endpoint, options)
            .then((res) => (res.ok ? res.json() : Promise.reject(null)))
            .catch((err) => err);
    };
    const get = (url, options = {}, timeout = 10000) => customFetch(url, options, timeout);
    const post = (url, options = {}, timeout = 10000) => {
        options.method = 'POST';
        return customFetch(url, options, timeout);
    };
    const put = (url, options = {}, timeout = 10000) => {
        options.method = 'PUT';
        return customFetch(url, options, timeout);
    };
    const del = (url, options = {}, timeout = 10000) => {
        options.method = 'DELETE';
        return customFetch(url, options, timeout);
    };
    return {
        get,
        post,
        put,
        del,
    };
};
exports.handleHttp = handleHttp;
function getUrl(baseUrl, params) {
    const fullUrl = new URL(baseUrl);
    if (!params)
        return fullUrl.toString();
    const urlParams = new URLSearchParams(params);
    fullUrl.search = urlParams.toString();
    return fullUrl.toString();
}
exports.getUrl = getUrl;
function createHttpException(error, message = 'Error de servidor') {
    return new common_1.HttpException((error.message ?? error) || message, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
}
exports.createHttpException = createHttpException;
//# sourceMappingURL=http.util.js.map