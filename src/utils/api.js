import axios from 'axios';

let apiAxios = axios.create({
    timeout: 10000,
});

apiAxios.interceptors.request.use(config => {
    return Object.assign({}, config, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
});

apiAxios.interceptors.response.use(
    response => {
        console.log(response);

        return response.data;
    },
    error => {
        if (error.response) {
            if (error.response.status === 400) {
                throw new Error(error.response.data.errorMessage);
            } else {
                throw new Error('api error');
            }
        } else {
            throw new Error('请求错误');
        }
    }
);

export default apiAxios;
