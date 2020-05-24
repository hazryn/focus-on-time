<template>
  <div id="workplace">
    <user-avatar :src="avatar" :display-name="displayName"/>
    <search-element :task="task" @click="$emit('onOpenSearch')"/>
    <task-time-element :task="task"/>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import UserAvatar from '@/components/molecules/UserAvatar';
import { mapGetters } from 'vuex';
import SearchElement from '@/components/organisms/SearchElement';
import TaskTimeElement from '@/components/organisms/TaskTimeElement';

@Component({
  components: { TaskTimeElement, SearchElement, UserAvatar, ButtonElement },
  computed: {
    ...mapGetters('Work', {
      task: 'GET_TASK',
    }),
    ...mapGetters('Account', {
      avatar: 'GET_AVATAR',
      displayName: 'GET_DISPLAY_NAME',
    }),
  },
})
export default class WorkPlaceElement extends Vue {
  @Prop({ default: false, type: Boolean }) logged;
}
</script>

<style scoped lang="scss">
#workplace {
  background-color:#484848;
  display: flex;
  justify-content: space-between;
  height: 22px;
  line-height: 22px;
}
</style>
