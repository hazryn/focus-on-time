<template>
  <button-element title="Zaloguj się">
    <lock-icon height="14" width="14"/>
  </button-element>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import LockIcon from '@/components/atoms/icons/LockIcon.vue';
import ButtonElement from '@/components/atoms/ButtonElement.vue';

@Component({
  components: { ButtonElement, LockIcon },
})
export default class HeaderElement extends Vue {
}
</script>
