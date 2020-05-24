<template>
  <div class="overlay" v-if="loading">
    <ping-pong/>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PingPong } from 'vue-loading-spinner';

@Component({ components: { PingPong } })
export default class LoadingOverlay extends Vue {
  @Prop(Boolean) loading;
}
</script>

<style scoped lang="scss">
.absolute-center {
  position: absolute;
  margin:auto;
  overflow: hidden;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.overlay {
  @extend .absolute-center;
  background-color:#000000b3;
  z-index: 100;
}
.spinner {
  @extend .absolute-center;
}
</style>
