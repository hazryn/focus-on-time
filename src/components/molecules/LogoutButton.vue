<template>
  <button-element title="Logout" @click="onClick" :disabled="disabled" height="18">
    <logout-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import LockIcon from '@/components/atoms/icons/SignInIcon.vue';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import LogoutIcon from '../atoms/icons/LogoutIcon';

@Component({ components: { LogoutIcon, ButtonElement, LockIcon } })
export default class LogoutButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
