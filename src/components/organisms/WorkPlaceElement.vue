<template>
  <div id="workplace">
    ikona :)
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';

@Component({ components: { ButtonElement } })
export default class WorkPlaceEhelent extends Vue {
  @Prop({ default: false, type: Boolean }) logged;
}
</script>

<style scoped lang="scss">
#workplace {
  background-color:#484848;
  display: flex;
  justify-content: space-between;
  height: 18px;
  line-height: 18px;
}
</style>
