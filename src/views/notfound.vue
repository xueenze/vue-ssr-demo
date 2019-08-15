<template>
    <div class = "not-found-container">
        <strong>{{$t("notFound")}}</strong>
    </div>
</template>
<script>
export default {
    name: 'notFound',
};
</script>
<style lang="less" scoped>
    .not-found-container{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
    }
</style>
