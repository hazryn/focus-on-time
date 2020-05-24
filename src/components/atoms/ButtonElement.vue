<template>
  <button :class="['button', disabled ? 'disabled' : null ]" @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ButtonElement extends Vue {
  @Prop({ default: false, type: Boolean }) disabled;
}
</script>

<style scoped lang="scss">
  .button {
    transition: all .5s;
    border-radius: 2px;
    padding: 2px 2px;
    border: 0;
    outline: 0;
    background-color: transparent;
    margin:0 2px;
    &:not(.disabled) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.20);
        cursor: pointer;
      }
    }
  }
</style>
