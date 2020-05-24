<template>
  <div id="search-bar">
    <button-element @click="$emit('click')" :title="getTaskName">
      <template v-if="task">
        <div class="task">
          <img :src="task.issue.icon" :title="task.issue.name" :alt="task.issue.name"/>
          <span>{{ task.key }}</span> | <span>{{ taskShortName }}</span>
        </div>
      </template>
      <template v-else>
        <b>NONE</b>
      </template>
    </button-element>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import UserAvatar from '@/components/molecules/UserAvatar';
import { mapGetters } from 'vuex';

@Component({
  components: { UserAvatar, ButtonElement },
  computed: {
    ...mapGetters('Account', {
      avatar: 'GET_AVATAR',
      displayName: 'GET_DISPLAY_NAME',
    }),
  },
})
export default class SearchElement extends Vue {
  @Prop({ type: Object, default: null }) task;

  get taskShortName() {
    if (this.task.name.length > 24) {
      return `${this.task.name.slice(0, 24).trim()}...`;
    }
    return this.task.name;
  }

  get getTaskName() {
    return this.task ? this.task.name : null;
  }
}
</script>

<style scoped lang="scss">
#search-bar {
  display: flex;
}
.button {
  width: 240px;
  color: white;
}
.task {
  display: flex;
  white-space: pre;
  img {
    margin-right: 3px;
  }
  span {
    margin: 0 2px;
  }
}
</style>
