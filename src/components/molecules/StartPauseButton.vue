<template>
  <button-element :title="title" @click="onClick" :disabled="disabled" height="18">
    <pause-icon v-if="disabled || !paused" height="14" width="14" :disabled="disabled"/>
    <start-icon v-else height="14" width="14" :disabled="disabled"/>
  </button-element>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import PauseIcon from '../atoms/icons/PauseIcon';
import StartIcon from '../atoms/icons/StartIcon';

@Component({
  components: {
    ButtonElement,
    StartIcon,
    PauseIcon,
  },
})
export default class StartPauseButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled;

  @Prop({ type: Boolean, default: false }) paused;

  get title() {
    if (this.disabled || this.started) {
      return 'Pause work';
    }
    return 'Start work';
  }

  onClick() {
    if (!this.disabled) {
      if (!this.paused) {
        this.$emit('stop');
      } else {
        this.$emit('start');
      }
    }
  }
}
</script>
