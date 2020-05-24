<template>
  <div id="resources">
    <resources-list :resources="resources" :current="resource" @click="selectResource"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';
import ResourcesList from '@/components/organisms/ResourcesList';
import { mapGetters, mapMutations } from 'vuex';

@Component({
  components: { ResourcesList },
  inject: ['accountModule'],
  computed: {
    ...mapGetters('Account', {
      resources: 'GET_RESOURCES',
      resource: 'GET_RESOURCE',
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

  selectResource(resource) {
    this.setCurrentResource(resource);
    this.$router.push({ name: 'Home' });
  }
}
</script>
