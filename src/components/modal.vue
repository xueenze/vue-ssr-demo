<template>
    <div class="modal-container mask">
        <div class="modal-dialog abs">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click = "operateButton('close')"><span>×</span></button>
                </div>
                <div class="modal-body">
                    <div class = "modal-wrapper register" v-if = "dialogType == 'register'">
                        <h1>{{$t("registerDialog.title")}}</h1>
                        <i></i>
                        <div class = "register-group">
                            <div :class = "['form-group', validate.nameMessage ? 'has-error has-feedback' : '']">
                                <template v-if = "validate.nameMessage">
                                    <label class="control-label" for="inputError2">{{validate.nameMessage}}</label>
                                    <span class="glyphicon glyphicon-remove form-control-feedback"></span>
                                </template>
                                <input v-model = "name" type="text" class="form-control" :placeholder="$t('registerDialog.namePlaceHolder')">
                            </div>
                            <div :class = "['form-group', validate.emailMessage ? 'has-error has-feedback' : '']">
                                <template v-if = "validate.emailMessage">
                                    <label class="control-label" for="inputError2">{{validate.emailMessage}}</label>
                                    <span class="glyphicon glyphicon-remove form-control-feedback"></span>
                                </template>
                                <input v-model = "email" type="text" class="form-control" :placeholder="$t('registerDialog.emailPlaceHolder')">
                            </div>
                            <div :class = "['form-group', validate.emailConfirmMessage ? 'has-error has-feedback' : '']">
                                <template v-if = "validate.emailConfirmMessage">
                                    <label class="control-label" for="inputError2">{{validate.emailConfirmMessage}}</label>
                                    <span class="glyphicon glyphicon-remove form-control-feedback"></span>
                                </template>
                                <input v-model = "emailConfirm" type="text" class="form-control" :placeholder="$t('registerDialog.emailConfirmPlaceHolder')">
                            </div>
                            <a class="btn btn-primary" href="#" @click = "validateInput">{{$t("registerDialog.sendButton")}}</a>
                        </div>
                    </div>
                    <div class = "modal-wrapper success" v-if = "dialogType == 'success'">
                        <h1>{{$t("successDialog.title")}}</h1>
                        <i></i>
                        <div class = "info">
                            <p>{{$t("successDialog.info1")}}</p>
                            <p>{{$t("successDialog.info2")}}</p>
                        </div>
                        <a class="btn btn-primary" href="#" @click = "operateButton('success')">{{$t("successDialog.okButton")}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, } from 'vuex';

export default {
    props: {
        dialogType: {
            type: String,
            default: 'register',
        },
    },
    data() {
        return {
            name: '',
            email: '',
            emailConfirm: '',
            validate: {
                nameMessage: '',
                emailMessage: '',
                emailConfirmMessage: '',
            },
        };
    },
    computed: {
        ...mapGetters({
            isRegistering: 'isRegister',
        }),
    },
    methods: {
        async validateInput() {
            // 这里我们先校验一下，校验的逻辑分一些优先级
            // 第一步输入内容不能为空
            this.validate.nameMessage = this.name === '' ? this.$t('registerDialog.nameValidateEmpty') : '';
            this.validate.emailMessage = this.email === '' ? this.$t('registerDialog.emailValidateEmpty') : '';
            this.validate.emailConfirmMessage = this.emailConfirm === '' ? this.$t('registerDialog.emailConfirmValidateEmpty') : '';

            if (this.validate.nameMessage || this.validate.emailMessage || this.validate.emailConfirmMessage) {
                return;
            }

            // 第二步判断邮箱格式是否正确
            let reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
            if (!reg.test(this.email)) {
                this.validate.emailMessage = this.$t('registerDialog.emailFormatValidate');
                return;
            }

            // 第三步判断邮箱再次输入的内容是否和第一次一样
            if (this.email !== this.emailConfirm) {
                this.validate.emailConfirmMessage = this.$t('registerDialog.emailRepeatValidate'); ;
                return;
            }

            await this.operateButton('register');
        },
        async operateButton(type) {
            try {
                this.$emit('operateDialog', {
                    operateType: 'close',
                });

                if (type === 'register') {
                    this.$toast(this.$t('registerSubmit'), 'info');
                    this.$store.commit('SET_REGISTER', true);

                    await this.$apiAxios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
                        name: this.name,
                        email: this.email,
                    });

                    this.$emit('operateDialog', {
                        operateType: 'success',
                    });

                    this.name = '';
                    this.email = '';
                    this.emailConfirm = '';
                }
            } catch (e) {
                console.log(e.message);
                this.$emit('operateDialog', {
                    operateType: 'error',
                    message: e.message,
                });
            };
        },
    },
};
</script>

<style lang="less" scoped>
    .modal-container{
        .modal-dialog{
            left: 0;
            right: 0;
            width: 80%;
            max-width: 500px;
            margin: auto;
            top: 50%;
            transform: translateY(-50%);

            .modal-body{
                .modal-wrapper{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    h1{
                        font-size: 20px;
                        font-style: italic;
                    }

                    i{
                        width: 40px;
                        height: 20px;
                        border-bottom: 1px solid;
                        margin-bottom: 20px;
                    }

                    a{
                        width: 100%;
                    }
                }

                .modal-wrapper.register{
                    .register-group{
                        width: 100%;

                        .form-group{
                            margin-bottom: 20px;
                        }
                    }
                }

                .modal-wrapper.success{
                    i{
                        margin-bottom: 40px;
                    }

                    .info{
                        margin-bottom: 40px;

                        p{
                            line-height: 20px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>
