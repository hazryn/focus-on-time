<template>
  <ul>
    <li v-for="resource in resources" :key="resource.id">
      <resource-item :resource="resource" @click="$emit('onSelectResource')"/>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ResourceItem from '../molecules/ResourceItem';

@Component({
  components: { ResourceItem },
})
export default class ResourcesList extends Vue {
  @Prop({ required: true }) resources;
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
