<template>
    <header class = "fix">
        <h2>{{$t("companyName")}}</h2>
        <div class = "locale-switch">
            <span>中文</span>
            <label for="">
                <input type="checkbox" name = "" class="a-switch" v-model = "isEn">
            </label>
            <span>En</span>
        </div>
    </header>
</template>
<script>

export default {
    name: 'vheader',
    data() {
        return {
            isEn: true,
        };
    },
    watch: {
        isEn(value) {
            this.$i18n.locale = value ? 'en' : 'zh';
        },
    },
};
</script>
<style lang="less" scoped>
    header{
        line-height: 80px;
        font-size: 25px;
        font-weight: bold;
        border-bottom: 1px solid #000000;
        padding: 0 10px 0 20px;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2{
            font-size: 25px;
        }

        .locale-switch{
            span{
                font-size: 14px;
                display: inline-block;
                margin: 0 10px;
            }

            span.selected{
                color: #337ab7;
            }

            label{
                margin: 0;
            }

            .a-switch{
                width: 40px;
                height: 22px;
                border-radius: 20px;
                -webkit-appearance: none;
                user-select: none;
                outline: none;
                background-color: #337ab7;
                box-shadow: #337ab7 0 0 0 0 inset;
                position: relative;
                transition: 0.4s;
                vertical-align: middle;
                cursor: pointer;
            }

            .a-switch:before{
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 100%;
                background-color: #fff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                position: absolute;
                left:0;
                top:1px;
                transition:0.3s;
            }

            .a-switch:checked{
                border-color: #337ab7;
                box-shadow: #337ab7 0 0 0 14px inset;
                background-color: #337ab7;
            }

            .a-switch:checked:before{
                left:20px;
            }
        }
    }
</style>
