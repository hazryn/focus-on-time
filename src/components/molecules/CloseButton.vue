<template>
  <button-element title="Choose account" @click="onClick" :disabled="disabled" height="18">
    <cloud-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import CloudIcon from '../atoms/icons/CloudIcon';

@Component({ components: { CloudIcon, ButtonElement } })
export default class AccountButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
