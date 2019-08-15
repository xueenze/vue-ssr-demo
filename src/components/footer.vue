<template>
    <footer class = "fix">
        <p>{{$t("copy1")}}<span class="glyphicon glyphicon-heart"></span>{{$t("copy2")}}</p>
        <p>{{$t("copy3")}}</p>
    </footer>
</template>
<script>
export default {
    name: 'vfooter',
};
</script>
<style lang="less" scoped>
    footer{
        font-size: 15px;
        border-top: 1px solid #000000;
        padding: 15px 0;
        bottom: 0;
        left: 0;
        width: 100%;

        p{
            text-align: center;
            line-height: 25px;
            font-style: italic;
        }
    }
</style>
