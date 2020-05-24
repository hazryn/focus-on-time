<template>
  <div id="app">
    <loading-overlay :loading="this.loading"/>
    <header-element
      @onLogin="onLogin"
      @logout="onLogout"
      @onChooseAccount="openChooseAccount"
      @onWorkLogOpen="openWorkLog"
      @startWork="onStartWork"
      @stopWork="onStopWork"
      @closeApplication="closeApplication"
      @openSettings="openSettings"
      :logged="isLogged"
      :work-log="currentWorkLog"
    />
    <work-place-element :logged="isLogged" @onOpenSearch="openSearch"/>
    <router-view/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import HeaderElement from '@/components/organisms/HeaderElement.vue';
import { mapGetters } from 'vuex';
import LoadingOverlay from '@/components/molecules/LoadingOverlay';
import WorkPlaceElement from '@/components/organisms/WorkPlaceElement';
import { ipcRenderer } from 'electron';

@Component({
  components: { WorkPlaceElement, LoadingOverlay, HeaderElement },
  inject: ['accountModule', 'workModule'],
  computed: {
    ...mapGetters('Account', {
      isLogged: 'IS_LOGGED',
    }),
    ...mapGetters('Work', {
      currentWorkLog: 'GET_CURRENT_WORK_LOG',
    }),
  },
})
export default class App extends Vue {
  data() {
    return {
      loading: false,
    };
  }

  async onLogin() {
    try {
      this.loading = true;
      await this.accountModule.login();
    } catch (error) {
      console.error('Error while getting token', error);
    } finally {
      this.loading = false;
    }
  }

  onLogout() {
    this.accountModule.logout();
    this.workModule.clearWork();
  }

  openChooseAccount() {
    if (this.$router.currentRoute.name !== 'Resources') {
      this.$router.push({ name: 'Resources' });
    } else {
      this.$router.push({ name: 'Home' });
    }
  }

  openSearch() {
    if (this.$router.currentRoute.name !== 'Search') {
      this.$router.push({ name: 'Search' });
    } else {
      this.$router.push({ name: 'Home' });
    }
  }

  openWorkLog() {
    if (this.$router.currentRoute.name !== 'WorkLog') {
      this.$router.push({ name: 'WorkLog' });
    } else {
      this.$router.push({ name: 'Home' });
    }
  }

  openSettings() {
    if (this.$router.currentRoute.name !== 'Settings') {
      this.$router.push({ name: 'Settings' });
    } else {
      this.$router.push({ name: 'Home' });
    }
  }

  closeApplication() {
    ipcRenderer.send('close');
  }

  onStartWork() {
    this.workModule.resumeWork();
  }

  onStopWork() {
    this.workModule.stopWork();
  }
}
</script>

<style lang="scss">
body {
  font-family: Roboto, Arial, "Times New Roman";
  overflow: hidden;
  margin: 0;
  * {
    box-sizing: border-box;
  }
}
#app {
  width: 330px;
  height: 40px;
}
</style>
