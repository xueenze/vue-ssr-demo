import { shallowMount, } from '@vue/test-utils';
import notfound from '@/views/notfound';

describe('notfound', () => {
    it('renders successfully', () => {
        shallowMount(notfound, {
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
