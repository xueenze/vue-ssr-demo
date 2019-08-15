<template>
    <div class = "main-container row">
        <div class = "wrapper">
            <h1>{{$t("title1")}}</h1>
            <h1>{{$t("title2")}}</h1>
            <p>{{$t("subTitle")}}</p>
            <a v-if = "!isRegistering"
                class="btn btn-primary btn-lg" href="#" @click = "registerClick">{{$t("requestButton")}}</a>
            <a v-else
                class="btn btn-default disabled btn-lg" href="#">
                <span style="display: table-cell;padding-right: 10px;">{{$t("loadingButton")}}</span>
                <span style="display: table-cell;" class = "loading"></span>
            </a>
        </div>
        <v-modal v-show = "isShowDialog"
            :dialogType = "dialogType"
            @operateDialog = "operateDialog"></v-modal>
    </div>
</template>

<script>
import {mapGetters, } from 'vuex';

import modal from '../components/modal';

export default {
    name: 'index',
    components: {
        'v-modal': modal,
    },
    data() {
        return {
            isShowDialog: false,
            dialogType: '',
        };
    },
    computed: {
        ...mapGetters({
            isRegistering: 'isRegister',
        }),
    },
    mounted() {
    },
    methods: {
        registerClick() {
            this.isShowDialog = true;
            this.dialogType = 'register';
        },
        operateDialog(params) {
            console.log(params);

            if (params.operateType === 'success') {
                this.isShowDialog = true;
                this.dialogType = 'success';
                this.$toast(this.$t('registerSuccess'), 'success');
                this.$store.commit('SET_REGISTER', false);
            }

            if (params.operateType === 'error') {
                this.isShowDialog = false;
                this.dialogType = '';
                this.$toast(`${this.$t('registerFail')}: ${params.message}`, 'error');
                this.$store.commit('SET_REGISTER', false);
            }

            if (params.operateType === 'close') {
                this.isShowDialog = false;
                this.dialogType = '';
            }
        },
    },
};
</script>

<style lang="less" scoped>
    .main-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            h1{
                line-height: 40px;
            }

            p{
                font-size: 15px;
                line-height: 60px;
            }
        }

        .loading{
            display: inline-block;
            vertical-align: middle;
            background-image: url(data:image/png;base64,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);
            width: 24px;
            height: 24px;
            background-size: contain;
            background-repeat: no-repeat;
            transform-origin: center;
            animation: loading 1s steps(12, end) infinite;
        }

        @keyframes loading {
            0% {
                transform: rotate3d(0, 0, 1, 0deg);
            }

            100% {
                transform: rotate3d(0, 0, 1, 360deg);
            }
        }
    }
</style>
