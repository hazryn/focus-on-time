<template>
  <div id="settings">
    <setting-item :value="settings.workLogDescriptionRequired" @change="v => changeSetting('workLogDescriptionRequired', v)">
      Worklog description required
    </setting-item>
    <setting-item :value="settings.keepSignedIn" @change="v => changeSetting('keepSignedIn', v)">
      Keep me signed in
    </setting-item>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { remote } from 'electron';
import SettingItem from '@/components/molecules/SettingItem';
import { mapState, mapMutations } from 'vuex';

@Component({
  components: { SettingItem },
  inject: ['accountModule'],
  computed: {
    ...mapState('Account', ['settings']),
  },
  methods: {
    ...mapMutations('Account', {
      updateSetting: 'UPDATE_SETTING',
    }),
  },
})
export default class Settings extends Vue {
  mounted() {
    remote.getCurrentWindow()
      .setContentSize(330, 120);
  }

  changeSetting(name, value) {
    this.updateSetting({ name, value });
    this.accountModule.storeSettings();
  }
}
</script>
