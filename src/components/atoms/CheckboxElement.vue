<template>
  <checkbox class="checkbox" type="checkbox" @change="onChange" :checked="value" color="#2196f3" :size="20">
    <slot/>
  </checkbox>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import Checkbox from 'vue-material-checkbox';

@Component({ components: { Checkbox } })
export default class CheckboxElement extends Vue {
  @Prop({ default: false, type: Boolean }) value;

  onChange(value) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
.checkbox {
  margin: 0;
  margin-left: 15px;
  display: flex;
}
</style>
