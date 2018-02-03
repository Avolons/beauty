<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
import { API } from '@/services';
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {
            API.common.getNmae().then((res)=>{
                document.title=res.data;
            }).catch((err)=>{

            });
        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
.main .single-page-con .single-page{
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    min-height: 100%;
}
</style>
