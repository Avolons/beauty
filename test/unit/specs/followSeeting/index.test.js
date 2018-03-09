import { shallow, createLocalVue } from 'vue-test-utils';
import App from '@/app';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('HelloWorld.vue', () => {
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                app: {
                    themeColor: 'blue'
                }
            }
        });
    });
    it('equals messages to ["Cat"]', () => {
        const cmp = shallow(App, { store, localVue });
        // Within cmp.vm, we can access all Vue instance methods
        expect(cmp.vm.routeList).toEqual(['/followSetting/voice/voice', '/followSetting/template/template', '/followSetting/way/way']);
    });
});
