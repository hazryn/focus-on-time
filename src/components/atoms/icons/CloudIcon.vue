<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :fill="color"
       viewBox="0 0 512 512" xml:space="preserve">
        <path d="M418.06,256.054c-1.451,0-2.902,0-4.268,0.085c2.817-11.19,4.251-22.687,4.268-34.227
          c0-75.427-61.139-136.565-136.565-136.565S144.93,146.486,144.93,221.913c0,1.963,0,3.926,0.171,5.889
          c-11.011-3.926-22.619-5.924-34.312-5.889c-56.564,0-102.424,45.86-102.424,102.424s45.86,102.424,102.424,102.424H418.06
          c47.141,0,85.353-38.213,85.353-85.353S465.201,256.054,418.06,256.054z"/>
  </svg>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class LockIcon extends Vue {
  @Prop({ default: false, type: Boolean }) disabled;

  get color() {
    return this.disabled ? '#636363' : '#2196f3';
  }
}
</script>
