<template>
  <button-element class="button" title="Close" @click="onClick" :disabled="disabled" height="18">
    <close-rounded-icon height="24" width="24" :disabled="disabled"/>
    <div><slot/></div>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import CloseRoundedIcon from '../atoms/icons/CloseRoundedIcon';

@Component({ components: { CloseRoundedIcon, ButtonElement } })
export default class WorkLogButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
.button {
  padding: 10px;
  &:hover {
    background-color:#dadada !important;
  }
}
</style>
