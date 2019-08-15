import { createLocalVue, shallowMount, } from '@vue/test-utils';
import Vuex from 'vuex';
import index from '@/views/index';
import store from '@/store';

const localVue = createLocalVue(store);

localVue.use(Vuex);

describe('index', () => {
    let getters;
    let store;

    beforeEach(() => {
        getters = {
            isRegister: () => false,
        };

        store = new Vuex.Store({
            getters,
        });
    });
    it('renders successfully', () => {
        shallowMount(index, {
            localVue,
            store,
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
