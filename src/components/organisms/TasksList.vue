<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <task-item :task="task" @click="onClick"/>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ResourceItem from '../molecules/ResourceItem';
import TaskItem from '../molecules/TaskItem';

@Component({
  components: { TaskItem, ResourceItem },
})
export default class TasksList extends Vue {
  @Prop({ required: true, type: Array }) tasks;

  onClick(task) {
    this.$emit('click', task);
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 534px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
