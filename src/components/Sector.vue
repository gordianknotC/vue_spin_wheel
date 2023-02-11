<template lang="pug">
section
  .container.relative(ref="sectorContainer")
    .sector(ref="sector")
      .sector__before
      .sector__content {{text}}
      .sector__after

</template>

<script lang="ts">
import { ComputedRef, defineComponent, ref, watch } from "vue";
import {onMounted} from "~/appCommon/base/vueTypes";
const randomArr = (start: number, end: number) => {
  return Math.round(start + Math.random() * (end - start));
};


export default defineComponent({
  name: "Sector",
  components: {
  },
  props: {
    diameter:{
      type: Number,
      default: 200,
    },
    unit:{
      type: String,
      default: 'px'
    },
    backgroundColor:{
      type: String,
      default: '#000',
    },
    borderThickness:{
      type: Number,
      default: 2,
    },
    borderColor:{
      type: String,
      default: '#ab0',
    },
    sectorAngleInDegree:{
      type: Number,
      default: 45,
    },
    initialQuadrant:{
      type: Number,
      default: 2,
    },
    text:{
      type: String,
      default: "12340",
    },
    fontSize:{
      type: String,
      default: "10px"
    },
    fontColor:{
      type: String,
      default: "#fff",
    }
  },
  setup(props) {
    const sector = ref<HTMLElement>();
    const sectorContainer = ref<HTMLElement>();

    /****
     *  transform: rotate(-90deg) - from quadrant 3 to quadrant 4
     *  transform: rotate(90deg)  - from quadrant 1 to quadrant 2
     *  transform: rotate(0deg)   - from quadrant 4 to quadrant 1
     * */
    onMounted(()=>{
      const unit = props.unit;
      const radius = `${props.diameter/2}${unit}`;
      const diameter = `${props.diameter}${unit}`;
      const backgroundColor = props.backgroundColor;
      const borderColor = props.borderColor;
      const borderThickness = props.borderThickness;
      const borderWidth = `${borderThickness}${unit} ${borderThickness}${unit} 0`;
      const borderRadius = `${radius} ${radius} 0 0`;
      const transformOrigin = `${radius} ${radius}`
      const initialDegree = -90;
      const fontSize = props.fontSize;
      const fontColor = props.fontColor;

      const sectorBaseStyle = {
        marginLeft: radius,
        width: radius,
        height: diameter,
        borderRadius: `0 ${radius} ${radius} 0`,
        transform: `rotate(${(props.initialQuadrant - 1) * 90 }deg)`,
        transformOrigin: `0px ${radius}`
      }

      const sectorBeforeAndAfterStyle ={
        boxSizing: "border-box",
        width: diameter,
        height: radius,
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        transformOrigin,
      }

      const sectorBeforeStyle ={
        transform: `rotate(${initialDegree + props.sectorAngleInDegree}deg)`
      }

      const sectorContentStyle ={
        transform: `rotate(${initialDegree + props.sectorAngleInDegree/2}deg)`,
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        lineHeight: 0,
        fontSize,
        color: fontColor,
      }

      const sectorAfterStyle ={
        transform: `rotate(${initialDegree + 180}deg)`
      }

      const sectorElt = sector.value!;
      const sectorBeforeElt = sector.value!.querySelector(".sector__before") as HTMLElement;
      const sectorAfterElt = sector.value!.querySelector(".sector__after") as HTMLElement;
      const sectorContentElt = sector.value!.querySelector(".sector__content") as HTMLElement;

      Object.assign(sectorContainer.value!.style!, {
        width: diameter,
        height: diameter,
      })
      Object.assign(sectorElt.style, sectorBaseStyle);
      Object.assign(sectorBeforeElt.style, sectorBeforeAndAfterStyle);
      Object.assign(sectorAfterElt.style, sectorBeforeAndAfterStyle);
      Object.assign(sectorContentElt.style, sectorBeforeAndAfterStyle);

      Object.assign(sectorBeforeElt.style, sectorBeforeStyle);
      Object.assign(sectorAfterElt.style, sectorAfterStyle);
      Object.assign(sectorContentElt.style, sectorContentStyle);
    })

    return {
      sector,
      sectorContainer
    }
  }
});
</script>

<style lang="scss" scoped>

.sector{
  position: absolute;
  width:50px;
  height:100px;
  overflow:hidden;
  border-radius:0 50px 50px 0;
  &__before, &__after, &__content{
    position: absolute;
    content:"";
    box-sizing:border-box;
    top:0;
    right:0;
    width:100px;
    height:50px;
    background-color:#0ce;
    border-style:solid;
    border-color: rgb(26, 25, 25);
    border-width:2px 2px 0;
    border-radius:50px 50px 0 0;
    transform-origin:50px 50px;
  }
  &__before{
    z-index:1;
    border-color: orange;
    background:#abc;
    transform:rotate(-90deg);
  }
  &__after{
    opacity:0;
    z-index:2;
    transform:rotate(90deg);
    border-color: blue;
  }
  &__content{
    opacity:1;
    z-index:3;
    background: none;
    border: none;
    transform:rotate(90deg);
    padding-right: 0.5rem;
    font-weight: bold;
  }
}


.container{
  @apply w-full m-0 p-0;
  height: 150px;
  position: relative;
}

</style>
