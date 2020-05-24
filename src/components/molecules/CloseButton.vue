<template>
  <button-element title="Close" @click="onClick" :disabled="disabled" height="18">
    <close-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import CloseIcon from '../atoms/icons/CloseIcon';

@Component({ components: { CloseIcon, ButtonElement } })
export default class AccountButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
