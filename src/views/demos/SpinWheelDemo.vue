<template lang="pug">
section.p-4
  h3.text-2xl.my-2 SpinWheel Demo
  .py-6.flex.justify-center.overflow-hidden
    .wheel.mb-4
      svg-icon.wheel__pointer(name="wheel-pointer" :size="60")
      svg-icon.wheel__border(name="wheel-border" :size="327")
      .wheel__content(ref="wheelElt")
        .wheel__innerShadow
        Sector.wheel__sector(
          v-for="(item, idx) in wheel?.state.dataList"
          :style="getSectorStyle(idx)"
          :key="idx"
          :text="item.worth"
          :background-color="getColor(item, idx)"
          :border-thickness="0"
          :diameter="280"
          :sectorAngleInDegree="wheel.sectorAngle"
          :initialQuadrant="4"
          :fontColor="getFontColor(item)"
          fontSize="1.5rem"
        )
  van-button(
    v-if="wheel"
    type="primary"
    @click="spin"
    block
    :disabled="wheel.stage == SpinWheelStage.spinning"
  ) Spin


  hr.my-4
  h3.text-2xl.my-2 Sector Demo
  Sector(
    text="45'-4 quadrant"
    background-color="blue"
    :border-thickness="0"
    :sectorAngleInDegree="45"
    :initialQuadrant="4"
    :diameter="280"
    font-color="black"
  )
  Sector(
    text="60'-4 quadrant"
    background-color="orange"
    :border-thickness="0"
    :sectorAngleInDegree="60"
    :initialQuadrant="4"
    :diameter="280"
  )
  Sector(
    text="45'-1 quadrant"
    background-color="blue"
    :border-thickness="0"
    :sectorAngleInDegree="45"
    :initialQuadrant="1"
    :diameter="280"
  )
  Sector(
    text="60'-1 quadrant"
    background-color="orange"
    :border-thickness="0"
    :sectorAngleInDegree="60"
    :initialQuadrant="1"
    :diameter="280"
  )
  Sector(
    text="45'-2 quadrant"
    background-color="blue"
    :border-thickness="0"
    :sectorAngleInDegree="45"
    :initialQuadrant="2"
    :diameter="280"
  )
  Sector(
    text="60'-2 quadrant"
    background-color="orange"
    :border-thickness="0"
    :sectorAngleInDegree="60"
    :initialQuadrant="2"
    :diameter="280"
  )
</template>

<script lang="ts">
import { ComputedRef, defineComponent, Ref, ref, watch } from "vue";
import {
  computed,
  onMounted,
  reactive,
  toRefs
} from "~/appCommon/base/vueTypes";
import { RouletteRecord, rouletteRecord} from "~/types/apiTypes";
import Sector from "~/components/Sector.vue";
import BaseApi from "~/services/apiService";
import {SpinWheel, SpinWheelStage, SpinWheelState} from "~/components/SpinWheel";

const randomArr = (start: number, end: number) => {
  return Math.round(start + Math.random() * (end - start));
};

export default defineComponent({
  name: "SpinWheel",
  components: {
    Sector
  },
  setup() {
    const colors = {
      firstPrize: "#fff",
      0: "#fa638b",
      1: "#f9ea63",
      2: "#25b8d7",
      3: "#62faba"
    };

    let wheel: Ref<SpinWheel<RouletteRecord> | undefined >= ref();
    const wheelElt = ref<HTMLElement>();

    const spin = async () => {
      const rnd = randomArr(0, wheel.value!.sectorNumbers);
      const matcher = function(elt: RouletteRecord): boolean{
        return rnd == elt.id;
      };
      wheel!.value!.spin(matcher).then((_)=>{
        console.log("start new spining", _);
      });
    };

    //最大獎底色 white
    const primaryPrize = (data: RouletteRecord[]) => {
      let primary = Number(data[0].worth)
      for(let i = 0; i < data.length; i ++) {
        if(Number(data[i].worth) > primary){
          primary = Number(data[i].worth)
        }
      }
      data.map((item)=>{
        if(Number(item.worth) == primary){
          item.firstPrize = true
        }
      })
    }

    onMounted(async () => {
      const state: SpinWheelState<RouletteRecord> = reactive({
        dataList: [],
        element: wheelElt.value!,
        initialDegree: 0
      });
      state.dataList = (await BaseApi.getRoulette({type: 1})).data;
      wheel.value = new SpinWheel<RouletteRecord>(state)
      console.log("wheel:", wheel);
      await primaryPrize(wheel.value!.state.dataList); //最大獎底色 white
    });

    return {
      wheel,
      wheelElt,
      spin,
      SpinWheelStage,
      getColor(item: RouletteRecord, idx: number) {
        return item.firstPrize
            ? colors.firstPrize
            : //@ts-ignore
            colors[(idx % 4) as any];
      },
      getFontColor(item: RouletteRecord) {
        return item.firstPrize ? "#000" : "#fff";
      },
      getSectorStyle(idx: number) {
        return `transform: rotate(${wheel.value!.sectorAngle * idx}deg)`;
      },
    };
  }
});
</script>

<style lang="scss" scoped>
.wheel {
  width: 327px;
  height: 327px;
  position: relative;

  &__pointer,
  &__content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 5;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    transition: transform 5s cubic-bezier(0, 0.47, 0.31, 1.03);
  }

  &__pointer {
    z-index: 10;
    filter: drop-shadow(0 0 6px rgba(#000, 0.8));
    transform: translateY(-8px);
  }
  &__sector,
  &__innerShadow {
    @apply w-full h-full;
    position: absolute;
    left: 0;
    top: 0;
  }
  &__innerShadow {
    background: none;
    box-shadow: inset rgba(0, 0, 0, 0.8) 0 0 10px;
    border-radius: 140px;
    z-index: 10000;
  }
}
.luckyWinner{
  &__title{
    @apply text-xl font-medium mb-4;
  }
  &__textLine{
    @apply flex justify-between items-center;
    @apply font-medium text-base;
    @apply mb-2;

    .luckyUser{
      @apply text-primary-grey;
    }
    .luckyMoney{
      @apply text-text-light;

    }
  }
}

.spin-btn {
  bottom: 3%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, 0);
  @apply fixed rounded-md border-none;
}
</style>
