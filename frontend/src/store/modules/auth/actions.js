import axios from "axios";
import {CSRF_TOKEN} from "../../../mixins/csrf_token";

//TODO: 1) return old auth logic from tutorial

let timer;

export default {
    axiosRequest(context, payload) {
      const token = localStorage.getItem('token');
        const config = {
            method: payload.method || "GET",
            url: payload.url || payload.endpoint,
            data: payload.data !== undefined ? JSON.stringify(payload.data) : null, //slf* is data not undefined, then use json.str.... otherwise it is null
            headers: {
                'content-type': "application/json",
                'X-CSRFTOKEN': CSRF_TOKEN,
                Authorization: `Bearer ${token}`
            },
        };
        return axios(config);
    },

    login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },

    auth(context, payload) {
        const mode = payload.mode;
        let endpoint = '/api/users/login/';
        if (mode === 'signup') {
            endpoint = '/api/users/register/';
        }
        const data = {
            username: payload.username,
            password: payload.password,
        };
        const authPayload = {
                    method: "POST",
                    url: endpoint,
                    data: data,
                };
        context.dispatch('axiosRequest', authPayload)
            .then(response => {
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                context.commit('setUser', {
                    username: response.data.username,
                    userId: response.data.userId,
                });
            })
            .catch(err => console.log(err));
        return context.dispatch('getToken', data);

    },
    getToken(context, payload) {
        const tokenConfig = {
            method: "POST",
            url: "/api/users/token/obtain/",
            data: {
                username: payload.username,
                password: payload.password,
            }
        };
        context.dispatch('axiosRequest', tokenConfig)
            .then(response => {
                localStorage.setItem('token', response.data.access);

                context.commit('setToken', {
                    token: response.data.access,
                });
            })
            .catch(error => console.log(error));
    },
    checkLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            });
        }
    },

    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
        });
    },
    autoLogout(context) {
        context.dispatch('logout');
        context.commit('hadAutoLogout')
    }
};