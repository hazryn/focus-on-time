<template>
  <div id="search-bar">
    <button-element>
      <template v-if="task">

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
  @Prop({ type: Object }) task;
}
</script>

<style scoped lang="scss">
.button {
  width: 100px;
}
</style>
