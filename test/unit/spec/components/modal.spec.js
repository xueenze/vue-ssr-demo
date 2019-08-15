import { shallowMount, } from '@vue/test-utils';
import modal from '@/components/modal';

describe('modal', () => {
    it('renders successfully', () => {
        shallowMount(modal, {
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
