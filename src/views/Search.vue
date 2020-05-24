<template>
  <div id="resources">
    <resources-list :resources="resources" @onSelectResource="onSelectResource"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';
import ResourcesList from '@/components/organisms/ResourcesList';
import { mapGetters, mapMutations } from 'vuex';
import { CloudResource } from '@/store/account/state';

@Component({
  components: { ResourcesList },
  inject: ['accountModule'],
  computed: {
    ...mapGetters('Account', {
      resources: 'GET_RESOURCES',
    }),
  },
  methods: {
    ...mapMutations('Account', {
      setCurrentResource: 'SET_CURRENT_RESOURCE',
    }),
  },
})
export default class Resources extends Vue {
  mounted() {
    remote.getCurrentWindow()
      .setContentSize(330, 240);
  }

  onSelectResource(resource) {
    this.setCurrentResource(resource);
    this.$router.push({ name: 'Home' });
  }
}
</script>
