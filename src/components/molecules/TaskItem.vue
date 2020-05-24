<template>
  <button-element @click="onClick" class="task">
    <user-avatar :src="assigneeAvatar" :display-name="task.assignee ? task.assignee.displayName : ''" :size="45"/>
    <div class="content">
      <div class="header">
        <img :src="task.issue.icon" :title="task.issue.name" :alt="task.issue.name"/>
        <span>{{ task.key }}</span> | <span class="status">{{ task.status }}</span>
      </div>
      <div> {{ task.name }}</div>
    </div>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import { userIconPlaceholder } from '@/store/account/interfaces';
import UserAvatar from './UserAvatar';

@Component({
  components: {
    UserAvatar,
    ButtonElement,
  },
})
export default class TaskItem extends Vue {
  @Prop({ type: Object, required: true }) task;

  get assigneeAvatar() {
    return this.task.assignee ? this.task.assignee.avatarUrls['32x32'] : userIconPlaceholder;
  }

  onClick() {
    this.$emit('click', this.task);
  }
}
</script>

<style scoped lang="scss">
  .task {
    display: flex;
    border-bottom: 1px solid #dadada;
    text-align: left;
    padding: 10px 5px;
    &:hover {
      background-color: rgba(218, 218, 218, 0.5) !important;
    }
    .header {
      font-weight: bold;
      display: flex;
      align-items: center;
      span {
        margin: 0 5px;
      }
    }
    .status {
      color: #2196f3;
    }
    .content {
      margin-left:5px;
    }
  }
</style>
