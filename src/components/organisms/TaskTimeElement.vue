<template>
  <div id="task-time" :class="{'blinking': (currentWorkLog && currentWorkLog.paused) || blinking }">
    {{ currentTime | time }}
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  inject: ['workModule'],
  computed: {
    ...mapGetters('Work', {
      currentTask: 'GET_TASK',
      currentWorkLog: 'GET_CURRENT_WORK_LOG',
    }),
  },
  data: () => ({
    prevTime: null,
    currentTime: null,
    blinking: false,
  }),
  filters: {
    time(time) {
      if (time === null) return '';

      const hours = parseInt(time / 60, 10);
      const minutes = parseInt(time - hours * 60, 10);

      return `${hours}h ${minutes}m`;
    },
  },
})
export default class TaskTimeElement extends Vue {
  @Prop({ type: Object }) task;

  @Watch('task')
  watchTask() {
    this.calculateTime();
  }

  created() {
    this.calculateTime();
    setInterval(this.calculateTime, 1000);
  }

  async calculateTime() {
    this.currentTime = this.workModule.getCurrentTaskTime();
    if (
      this.prevTime !== null
      && this.currentTime > 0
      && this.prevTime !== this.currentTime
      && this.currentTime % 30 === 0
    ) {
      this.blinking = true;
      setTimeout(() => { this.blinking = false; }, 4000);
    }
    this.prevTime = this.currentTime;
  }
}
</script>

<style scoped lang="scss">
#task-time {
  width: 60px;
  background-color: white;
  text-align: center;
  font-size:12px;
}
.blinking {
  animation: blinker 2s linear infinite;
}
@keyframes blinker {
  50% {
    color: red;
  }
}
</style>
