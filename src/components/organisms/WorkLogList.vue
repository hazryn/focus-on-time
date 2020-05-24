<template>
  <ul>
    <li v-for="workLog in workLogList" :key="workLog.id">
      <work-log-item
        :work-log="workLog"
        :description-required="descriptionRequired"
        @check="onCheck"
        @descriptionChange="onDescriptionChange"
        @remove="onRemove"
      />
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ResourceItem from '../molecules/ResourceItem';
import TaskItem from '../molecules/TaskItem';
import WorkLogItem from '../molecules/WorkLogItem';

@Component({
  components: { WorkLogItem, TaskItem, ResourceItem },
})
export default class WorkLogList extends Vue {
  @Prop({ required: true, type: Array }) workLogList;

  @Prop({ default: false, type: Boolean }) descriptionRequired;

  onCheck(workLog, value) {
    this.$emit('check', workLog, value);
  }

  onDescriptionChange(workLog, value) {
    this.$emit('descriptionChange', workLog, value);
  }

  onRemove(workLog) {
    this.$emit('remove', workLog);
  }
}
</script>

<style scoped lang="scss">
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 468px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
