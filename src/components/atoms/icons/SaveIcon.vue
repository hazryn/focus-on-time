<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :fill="color"
       viewBox="0 0 512 512" xml:space="preserve">
        <path d="M412.907,214.08C398.4,140.693,333.653,85.333,256,85.333c-61.653,0-115.093,34.987-141.867,86.08
          C50.027,178.347,0,232.64,0,298.667c0,70.72,57.28,128,128,128h277.333C464.213,426.667,512,378.88,512,320
          C512,263.68,468.16,218.027,412.907,214.08z M298.667,277.333v85.333h-85.333v-85.333h-64L256,170.667l106.667,106.667H298.667z"
          />
  </svg>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SaveIcon extends Vue {
  @Prop({ default: false, type: Boolean }) disabled;

  get color() {
    return this.disabled ? '#636363' : '#2196f3';
  }
}
</script>
