<template>
  <div class="setting">
    <checkbox-element :value="value" @change="onChange">
      <slot/>
    </checkbox-element>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import CheckboxElement from '../atoms/CheckboxElement';

@Component({ components: { CheckboxElement } })
export default class SettingItem extends Vue {
  @Prop({ type: Boolean, default: false }) value;

  onChange(value) {
    this.$emit('change', value);
  }
}
</script>

<style scoped lang="scss">
.setting {
  padding: 10px 5px;
  border-bottom: 1px solid #dadada;
}
</style>
