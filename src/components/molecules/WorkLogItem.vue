<template>
  <div class="work-log-item">
    <div>
      <checkbox-element @change="onChange" :value="workLog.checked"/>
    </div>
    <div>
      <div>
        <img :src="workLog.issue.icon" :title="workLog.issue.name" :alt="workLog.issue.name"/>
        <span>{{ workLog.key }}</span> | <span>{{ taskName }}</span>
      </div>
      <div class="shadow">
        {{ workLogTime | time }} | {{ getWorkLogEndTime | hours }}
      </div>
      <div class="description">
        <input-field placeholder="description..." @change="onDescriptionChange" :error="inputError"/>
      </div>
      <div class="close-hover">
        <close-button @click="onRemove"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import CheckboxElement from '@/components/atoms/CheckboxElement';
import InputField from '@/components/atoms/InputField';
import CloseButton from '@/components/molecules/CloseButton';
@Component({
  inject: ['workModule'],
  components: { CloseButton, InputField, CheckboxElement },
  data: () => ({
    workLogTime: null,
    interval: null,
    inputValue: '',
    checked: false,
    inputError: false,
  }),
  filters: {
    time(time) {
      if (time === null) return '';

      const hours = parseInt(time / 60, 10);
      const minutes = parseInt(time - hours * 60, 10);

      return `${hours}h ${minutes}m`;
    },
    hours(date) {
      return `${date.getHours()}:${date.getMinutes()}`;
    },
  },
})
export default class WorkLogItem extends Vue {
  @Prop({ type: Object, required: true }) workLog;

  @Prop({ default: false, type: Boolean }) descriptionRequired;

  get taskName() {
    if (this.workLog.name.length > 24) {
      return `${this.workLog.name.slice(0, 24).trim()}...`;
    }
    return this.workLog.name;
  }

  created() {
    this.updateWorkLogTime();
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.updateWorkLogTime.bind(this), 1000);
  }

  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  updateWorkLogTime() {
    this.workLogTime = this.workModule.calculateTimeForWorkLog(this.workLog);
  }

  get getWorkLogEndTime() {
    return this.workModule.getWorkLogEndTime(this.workLog);
  }

  setInputValidation() {
    this.inputError = this.descriptionRequired && this.checked && this.inputValue.trim() === '';
  }

  onChange(value) {
    this.checked = value;
    this.setInputValidation();
    this.$emit('check', this.workLog, value);
  }

  onDescriptionChange(value) {
    this.inputValue = value;
    this.setInputValidation();
    this.$emit('descriptionChange', this.workLog, value);
  }

  onRemove() {
    this.$emit('remove', this.workLog);
  }
}
</script>

<style scoped lang="scss">
.work-log-item {
  .description {
    margin-top: 5px;
  }
  &:hover {
    .close-hover {
      right: 0;
    }
  }
  .close-hover {
    position: absolute;
    right: -60px;
    top: 0;
    bottom: 0;
    width: 60px;
    background-color: #0000007a;
    display: flex;
    justify-content: center;
    transition: right .3s;
    button {
      margin:0;
      width: 100%;
    }
  }
  overflow: hidden;
  position: relative;;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dadada;
  .shadow {
    color: rgba(69, 69, 69, 0.75)
  }
  > div {
    display: flex;
    flex-direction: column;
    align-self: center;
    > * {
      display: flex;
      span {
        margin: 0 5px;

      }
    }
  }
}
</style>
