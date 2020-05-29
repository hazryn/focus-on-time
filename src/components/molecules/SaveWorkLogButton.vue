<template>
  <button-element class="button" title="Send to Jira" @click="onClick" :disabled="disabled" height="18">
    <save-icon height="24" width="24" :disabled="disabled"/>
    <div><slot/></div>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import SaveIcon from '../atoms/icons/SaveIcon';

@Component({ components: { SaveIcon, ButtonElement } })
export default class SaveWorkLogButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) {
      this.$emit('click');
    }
  }
}
</script>

<style scoped lang="scss">
  .button {
    padding: 10px;
    &.disabled, &:hover:not(.disabled) {
      background-color:#dadada !important;
    }
  }
</style>
