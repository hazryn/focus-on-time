<template>
  <div id="home"></div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';

@Component
export default class Home extends Vue {
  mounted() {
    remote.getCurrentWindow()
      .setContentSize(330, 40);
  }
}
</script>
