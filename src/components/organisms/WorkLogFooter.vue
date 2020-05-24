<template>
  <div id="work-log-footer">
    <div class="summary">
      Summary selected time: {{ sumTime | time }}
    </div>
    <div class="actions">
      <save-work-log-button :disabled="disabledSave" @click="$emit('save')">Send to Jira</save-work-log-button>
      <close-work-log-button @click="$emit('close')">Close</close-work-log-button>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import SaveWorkLogButton from '@/components/molecules/SaveWorkLogButton';
import CloseWorkLogButton from '@/components/molecules/CloseWorkLogButton';

@Component({
  components: { CloseWorkLogButton, SaveWorkLogButton },
  inject: ['workModule'],
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
  @Prop({ type: Number, default: 0 }) sumTime;

  @Prop({ type: Boolean, default: true }) disabledSave;
}
</script>

<style scoped lang="scss">
#work-log-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .summary {
    padding: 5px;
    border-top: 1px solid #dadada;
    text-align: center;
  }
  .actions {
    display:flex;
    justify-content: space-between;
    border-top: 1px solid #dadada;
    > button {
      flex-basis: 50%;
      margin:0 !important;
    }
  }
}
</style>
