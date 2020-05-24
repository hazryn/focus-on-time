<template>
  <div :class="{ resource: true, selected }" @click="onClick">
    <img :src="resource.avatarUrl" :title="resource.name"/>
    <span>{{ resource.name }}</span>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ResourceItem extends Vue {
  @Prop({ required: true }) resource;

  @Prop({ default: false, type: Boolean }) selected;

  onClick() {
    this.$emit('click', this.resource);
  }
}
</script>

<style scoped lang="scss">
.resource {
  display:flex;
  padding: 5px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #dadada;
  > span {
    margin-left: 15px;
    font-size: 20px;
  }
  > img {
    height: 50px;
    border-radius: 50%;
  }
  &.selected, &:hover {
    background-color: #bfbfbf;
  }
}
</style>
