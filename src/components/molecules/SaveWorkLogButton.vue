<template>
  <button-element title="Your work log" @click="onClick" :disabled="disabled" height="18">
    <work-log-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import WorkLogIcon from '@/components/atoms/icons/WorkLogIcon';

@Component({ components: { WorkLogIcon, ButtonElement } })
export default class WorkLogButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
