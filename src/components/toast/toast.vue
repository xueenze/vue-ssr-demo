<template>
    <transition mode = "in-out"
        enter-active-class = "animated fadeInUp faster"
        leave-active-class = "animated fadeOutUp faster">
        <div class = "alert toast-container alert-success"
            v-if = "toastType == 'success'">{{toastTemplate}}</div>
        <div class = "alert toast-container alert-info"
            v-if = "toastType == 'info'">{{toastTemplate}}</div>
        <div class = "alert toast-container alert-danger"
            v-if = "toastType == 'error'">{{toastTemplate}}</div>
    </transition>
</template>

<script>
export default {
    name: 'gtoast',
    data() {
        return {
            toastTemplate: '',
            toastType: '',
        };
    },
};
</script>

<style lang="less" scoped>
    .toast-container{
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        width: 90%;
        margin: auto;
        z-index: 1000;
        display: flex;
        justify-content: center;
    }
</style>
