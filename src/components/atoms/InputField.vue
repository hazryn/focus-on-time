<template>
  <input @keyup="onChange" :placeholder="placeholder" :class="{ error }"/>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class InputField extends Vue {
  @Prop({ default: '', type: String }) placeholder;

  @Prop({ default: false, type: Boolean }) error;

  onChange({ target: { value } }) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
input {
  width:100%;
  line-height: 20px;
  font-size:14px;
  text-indent: 5px;
  border: 1px solid #dadada;
  &:active, &:focus {
    outline: 0;
  }
  &.error {
    background-color: #f9acac;
  }
}
</style>
