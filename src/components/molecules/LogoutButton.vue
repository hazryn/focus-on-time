<template>
  <button-element title="Sign in" @click="onClick" :disabled="disabled" height="18">
    <lock-icon height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import LockIcon from '@/components/atoms/icons/SignInIcon.vue';
import ButtonElement from '@/components/atoms/ButtonElement.vue';

@Component({ components: { ButtonElement, LockIcon } })
export default class LoginButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  onClick() {
    if (!this.disabled) this.$emit('click');
  }
}
</script>
