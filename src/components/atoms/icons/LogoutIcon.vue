<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :fill="color"
       viewBox="0 0 420 420" xml:space="preserve">
        <g>
          <g>
            <polygon points="188.373,94.293 160,121.813 198.4,160.213 223.36,170.667 10.667,170.667 10.667,213.333 222.933,213.333
              197.547,224.64 159.787,262.187 188.587,289.493 286.08,192"/>
          </g>
        </g>
            <g>
          <g>
            <polygon points="138.667,0 96,0 96,42.667 96,85.333 138.667,85.333 138.667,42.667 330.667,42.667 330.667,341.333
              138.667,341.333 138.667,298.667 96,298.667 96,341.333 96,384 138.667,384 373.333,384 373.333,0"/>
          </g>
        </g>
  </svg>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class LogoutIcon extends Vue {
  @Prop({ default: false, type: Boolean }) disabled;

  get color() {
    return this.disabled ? '#636363' : '#2196f3';
  }
}
</script>
