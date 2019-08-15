import { shallowMount, } from '@vue/test-utils';
import toast from '@/components/toast/toast';

describe('toast', () => {
    it('renders successfully', () => {
        shallowMount(toast, {
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
