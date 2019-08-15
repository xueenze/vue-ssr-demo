import { shallowMount, } from '@vue/test-utils';
import footer from '@/components/footer';

describe('footer', () => {
    it('renders successfully', () => {
        shallowMount(footer, {
            mocks: {
                $t: (msg) => msg,
            },
        });
    });
});
