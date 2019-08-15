import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            // 是否在注册中
            isRegistering: false,
        },
        getters: {
            isRegister: (state) => {
                return state.isRegistering;
            },
        },
        mutations: {
            SET_REGISTER: (state, isRegister) => {
                state.isRegistering = isRegister;
            },
        },
    });
};
