import { axiosInstance } from './utilities';

export var api = async function ({
    method = 'get',
    api,
    body,
    status = false,
    token = '',
    baseURL = 'normal',
}) {
    return await new Promise((resolve, reject) => {
        // setting token
        axiosInstance.defaults.headers.common[
            'Authorization'
        ] = localStorage.getItem('AuthToken');

        axiosInstance[method](`${getServiceUrl(baseURL)}${api}`, body ? body : '')
            .then((data) => {
                resolve(statusHelper(status, data));
            })
            .catch((error) => {
                try {
                    if (error.response) {
                        reject(statusHelper(status, error.response));
                    } else {
                        reject(error);
                    }
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            });
    });
};

var statusHelper = (status, data) => {
    if (data.status == 401 || data.status == 403) {
        alert('error')
    }
    if (status) {
        return {
            status: data.status,
            ...data.data,
        };
    } else {
        return data.data;
    }
};

let getServiceUrl = (baseURL) => {
    let finalURL = '';

    switch (baseURL) {
        case 'default':
            finalURL = 'http://180.151.69.138:2239/api/v1/';
            break;

        default:
            finalURL = 'http://180.151.69.138:2239/api/v1/';
            break;
    }

    return finalURL;
};
