<template>
  <div id="header">
    <div>
      <login-button v-if="!logged" @click="$emit('onLogin')"/>
      <logout-button v-else @click="$emit('logout')"/>
      <account-button @click="$emit('onChooseAccount')" :disabled="!logged"/>
    </div>
    <div>
      <start-pause-button @start="$emit('startWork')" @stop="$emit('stopWork')" :disabled="!workLog" :paused="workLog && workLog.paused"/>
      <work-log-button @click="$emit('onWorkLogOpen')" :disabled="!logged"/>
      <setting-button @click="$emit('openSettings')" :disabled="!logged"/>
      <close-button @click="$emit('closeApplication')"/>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import ButtonElement from '@/components/atoms/ButtonElement.vue';
import LoginButton from '@/components/molecules/LoginButton';
import AccountButton from '@/components/molecules/AccountButton';
import WorkLogButton from '@/components/molecules/WorkLogButton';
import StartPauseButton from '@/components/molecules/StartPauseButton';
import CloseButton from '@/components/molecules/CloseButton';
import SettingButton from '@/components/molecules/SettingButton';
import LogoutButton from '@/components/molecules/LogoutButton';

@Component({ components: { LogoutButton, SettingButton, CloseButton, StartPauseButton, WorkLogButton, AccountButton, LoginButton, ButtonElement } })
export default class HeaderElement extends Vue {
  @Prop({ default: false, type: Boolean }) logged;

  @Prop({ default: null, type: Object }) workLog;
}
</script>

<style scoped lang="scss">
#header {
  -webkit-app-region: drag;
  > div {
    -webkit-app-region: no-drag;
  }
  background-color:#212121;
  display: flex;
  justify-content: space-between;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
}
</style>
