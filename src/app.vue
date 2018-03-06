<template>
    <div id="main" class="app-main">
        <router-view></router-view>
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
import { API } from '@/services';
export default {
    data() {
        return {
            theme: this.$store.state.app.themeColor,
            modal: false,
            routeList: ['/followSetting/voice/voice', '/followSetting/template/template', '/followSetting/way/way',],
        };
    },
    mounted() {
        API.common.getNmae().then((res) => {
            document.title = res.data;
        }).catch((err) => {

        });
    },
    created() {
      
    },
    beforeDestroy () {

    },
    /*  window.addEventListener('popstate', () => {
         let routePath = _this.$route.path;
         console.log(_this.$route.path);
         for (const ite of _this.routeList) {
             if (routePath.indexOf(ite) > -1) {
                 _this.modal = true;
                 window.history.forward(1);
                 return false;
             }
         }
         
     }); */
    beforeDestroy() {

    },
    methods: {
        liveCurrent() {

        }
    }
};
</script>

<style>
.app-main {
    width: 100%;
    height: 100%;
}

.main .single-page-con .single-page {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    min-height: 100%;
}
</style>
