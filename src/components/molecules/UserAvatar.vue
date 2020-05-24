<template>
  <div class="avatar">
    <img :src="src" :alt="displayName" :title="displayName" :style="{ height:`${size}px` }"/>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UserAvatar extends Vue {
  @Prop({ required: true, type: String }) src;

  @Prop({ required: true, type: String }) displayName;

  @Prop({ default: 20, type: Number }) size;
}
</script>

<style scoped lang="scss">
.avatar {
  display:flex;
  img {
    height: 20px;
    margin: 1px 4px;
    border-radius: 50%;
  }
}

</style>
