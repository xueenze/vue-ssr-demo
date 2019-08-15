<template>
  <div id = "app" class = "container-fluid">
    <v-header></v-header>
    <transition name = "fade" mode = "out-in">
      <router-view class = "main row"></router-view>
    </transition>
    <v-footer></v-footer>
  </div>
</template>

<script>
import '@/less/index.less';

import header from './components/header';
import footer from './components/footer';

export default {
    components: {
        'v-header': header,
        'v-footer': footer,
    },
};
</script>

<style lang="less" scoped>
  #app{
    .main{
      height: 100vh;
      padding: 80px 0;
    }
  }
</style>
