import { shallowMount, } from '@vue/test-utils';
import header from '@/components/header';

describe('header', () => {
    it('renders successfully', () => {
        shallowMount(header, {
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
