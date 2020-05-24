<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :fill="color"
       viewBox="0 0 565.648 565.648" xml:space="preserve">
        <path d="m282.824 0c-155.947 0-282.824 126.877-282.824 282.824s126.877 282.824 282.824 282.824 282.824-126.877 282.824-282.824-126.877-282.824-282.824-282.824zm-35.353 388.883h-70.706v-212.118h70.706zm141.412 0h-70.706v-212.118h70.706z"/>
  </svg>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class WorkLogIcon extends Vue {
  @Prop({
    default: false,
    type: Boolean,
  }) disabled;

  get color() {
    return this.disabled ? '#636363' : '#2196f3';
  }
}
</script>
