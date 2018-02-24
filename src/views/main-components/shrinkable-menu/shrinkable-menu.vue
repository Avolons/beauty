<style lang="less">
    @import './styles/menu.less';
</style>

<template>
    <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebar-menu 
            v-show="!shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebar-menu>
        <sidebar-menu-shrink 
            v-show="shrink"
            :menu-theme="theme" 
            :menu-list="menuList" 
            :icon-color="shrinkIconColor"
            @on-change="handleChange"
        ></sidebar-menu-shrink>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认离开</span>
            </p>
            <div style="text-align:center">
                <p>您还有编辑中的内容未保存</p>
                <p>是否确认离开?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="liveCurrent">离开</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import sidebarMenu from './components/sidebarMenu.vue';
import sidebarMenuShrink from './components/sidebarMenuShrink.vue';
import util from '@/libs/util';
export default {
    data(){
        return{
            routeList: ['/followSetting/voice/voice', '/followSetting/template/template', '/followSetting/way/way',],
            modal: false,
            name:"",
        }
    },
    name: 'shrinkableMenu',
    components: {
        sidebarMenu,
        sidebarMenuShrink
    },
    props: {
        shrink: {
            type: Boolean,
            default: false
        },
        menuList: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'dark',
            validator (val) {
                return util.oneOf(val, ['dark', 'light']);
            }
        },
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    computed: {
        bgColor () {
            return this.theme === 'dark' ? '#495060' : '#fff';
        },
        shrinkIconColor () {
            return this.theme === 'dark' ? '#fff' : '#495060';
        }
    },
    methods: {
        handleChange (name) {
            let willpush = true;
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }

            let routePath = this.$route.path;
            for (const ite of this.routeList) {
                if (routePath.indexOf(ite) > -1) {
                    this.modal = true;
                    this.name=name;
                    return false;
                }
            }
            
            if (willpush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-change', name);
        },
        liveCurrent(){
            this.$router.push({
                    name: this.name
            });
            this.modal = false;
        }
    }
};
</script>
