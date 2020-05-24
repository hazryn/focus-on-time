<template>
  <button-element title="Settings" @click="onClick" :disabled="disabled" height="18">
    <setting-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import LockIcon from '@/components/atoms/icons/SignInIcon.vue';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import SettingIcon from '../atoms/icons/SettingIcon';

@Component({ components: { SettingIcon, ButtonElement, LockIcon } })
export default class SettingButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
