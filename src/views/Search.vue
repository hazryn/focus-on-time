<template>
  <div id="search">
    <loading-overlay :loading="loading"/>
    <input-field @change="onSearch" placeholder="search..." :value="task ? task.key : ''"/>
    <tasks-list :tasks="tasks" @click="onSelect"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';
import ResourcesList from '@/components/organisms/ResourcesList';
import InputField from '@/components/atoms/InputField';
import TasksList from '@/components/organisms/TasksList';
import { mapState } from 'vuex';
import LoadingOverlay from '@/components/molecules/LoadingOverlay';

@Component({
  components: { LoadingOverlay, TasksList, InputField, ResourcesList },
  inject: ['workModule'],
  computed: {
    ...mapState('Work', ['task']),
  },
  data: () => ({
    loading: false,
    timeout: null,
    tasks: [],
  }),
})
export default class Search extends Vue {
  mounted() {
    this.tasks = [];

    remote.getCurrentWindow()
      .setContentSize(330, 600);

    if (this.task?.name.length > 2) {
      this.doSearch(this.task.name);
    }
  }

  onSelectResource(resource) {
    this.setCurrentResource(resource);
    this.$router.push({ name: 'Home' });
  }

  onSelect(task) {
    this.workModule.setTask(task);
    this.$router.push({ name: 'Home' });
  }

  onSearch(value) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (value.length > 1) {
      this.timeout = setTimeout(this.doSearch.bind(this, value), 500);
    }
  }

  async doSearch(value) {
    try {
      this.loading = true;
      this.tasks = await this.workModule.search(value);
    } catch (error) {
      console.error(error);
    } finally {
      this.timeout = null;
      this.loading = false;
    }
  }
}
</script>
