<template>
  <div id="work-log">
    <loading-overlay :loading="loading"/>
    <work-log-list
      :work-log-list="filteredList"
      :description-required="settings.workLogDescriptionRequired"
      @check="onCheck"
      @descriptionChange="onDescriptionChange"
      @remove="onRemove"
    />
    <work-log-footer :sum-time="sumTime" :disabled-save="!getChecked.length || !workLogValid" @close="onClose" @save="onSave"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';
import WorkLogList from '@/components/organisms/WorkLogList';
import { mapState, mapGetters, mapMutations } from 'vuex';
import WorkLogFooter from '@/components/organisms/WorkLogFooter';
import LoadingOverlay from '@/components/molecules/LoadingOverlay';

@Component({
  components: { LoadingOverlay, WorkLogFooter, WorkLogList },
  inject: ['workModule'],
  data: () => ({
    loading: false,
    sumTime: '0h 0m',
    interval: null,
    workLogValid: true,
  }),
  computed: {
    ...mapState('Work', {
      list: 'workLog',
    }),
    ...mapGetters('Work', {
      getChecked: 'GET_CHECKED',
    }),
    ...mapState('Account', {
      settings: 'settings',
    }),
    filteredList() {
      return this.list.filter((w) => this.workModule.calculateTimeForWorkLog(w));
    },
  },
  methods: {
    ...mapMutations('Work', {
      checkWork: 'CHECK_WORK',
      setWorkDescription: 'SET_WORK_DESCRIPTION',
    }),
  },
})
export default class WorkLog extends Vue {
  mounted() {
    remote.getCurrentWindow()
      .setContentSize(330, 600);
  }

  created() {
    this.updateSumTime();
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.updateSumTime.bind(this), 1000);
  }

  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  updateSumTime() {
    this.sumTime = this.workModule.getSumSelectedTime();
  }

  onCheck(workLog, value) {
    this.checkWork({ workLog, value });
    this.updateSumTime();
    this.workLogValid = this.workModule.isWorkLogValid();
  }

  onDescriptionChange(workLog, value) {
    this.setWorkDescription({ workLog, value });
    this.workLogValid = this.workModule.isWorkLogValid();
  }

  onClose() {
    this.$router.push({ name: 'Home' });
  }

  onRemove(workLog) {
    this.workModule.remove(workLog);
    this.updateSumTime();
  }

  async onSave() {
    try {
      this.loading = true;
      await this.workModule.sendWorkLogs();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
