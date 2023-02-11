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
          v-for="(item, idx) in wheelList"
          :style="getSectorStyle(idx)"
          :key="idx"
          :text="item.worth"
          :background-color="getColor(item, idx)"
          :border-thickness="0"
          :diameter="280"
          :sectorAngleInDegree="sectorAngle"
          :initialQuadrant="4"
          :fontColor="getFontColor(item)"
          fontSize="1.5rem"
        )
  van-button(
    type="primary"
    @click="spin"
    block
    :disabled="stage == EStage.spinning"
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
import { ComputedRef, defineComponent, ref, watch } from "vue";
import {
  computed,
  onMounted,
  reactive,
  toRefs
} from "~/appCommon/base/vueTypes";
import { RouletteRecord, rouletteRecord} from "~/types/apiTypes";
import Sector from "~/components/Sector.vue";
import BaseApi from "~/services/apiService";

const randomArr = (start: number, end: number) => {
  return Math.round(start + Math.random() * (end - start));
};

enum EStage {
  idle,
  spinning
}

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

    const state = reactive({
      list: [] as RouletteRecord[], //  轉盤資料 list
      wheelList: [] as RouletteRecord[],
      prizesLength: 0, // 單片數量
      initialDegree: 90, // 開始指針位置
      targetDegree: 0, // 目的位置
      stage: EStage.idle, // 狀態 idle / spinning
      counter: 1, // spin 次數，用來疊加
      sectorAngle: 0,

      luckyList: [] as rouletteRecord[] // 得獎紀錄 list
    });

    const wheelElt = ref<HTMLElement>();
    const span = computed(() => 360 / state.list.length);
    const radius = computed(() => Number(span.value.toFixed(2)));


    const spin = async () => {
      if (state.stage == EStage.spinning) return;

      const rnd = randomArr(0, state.list.length);
      const luckyMan = state.list[rnd];
      // 取得後端判定的得獎資料
      const prize = luckyMan.worth.toString() // 得獎金額
      spinToPrize(prize);
      setTimeout(async ()=>{
        await getRouletteRecord() // 更新得獎人列表
      }, 5000)
    };

    /** 第四象限為第一個 prize 起算 90 度（state.initialDegree) 作為 startupIndex
     *  以輸入參數 prize 取得 targetIndex
     *  @param prize: 獎金字串
     * */
    const spinToPrize = (prize: string) => {
      let acc = 0;
      const initialSpeed = 360 * 30 * state.counter;
      const targetIndex = state.list.findIndex(_ => _.worth == prize);

      const startupIndex = state.list.findIndex(_ => {
        acc += span.value;
        return Math.floor(acc) >= state.initialDegree;
      });

      const targetDegree = span.value * targetIndex - state.initialDegree;
      const shift = +span.value / 2;

      state.targetDegree = -(initialSpeed + targetDegree + shift);
    };

    watch(
        () => state.targetDegree,
        () => {
          state.stage = EStage.spinning;
          wheelElt.value!.style!.transform = `rotate(${state.targetDegree}deg)`;
        }
    );

    /** 假定資料由後端來
     *  如果格式不同，告知後端改或直接在 apiService 轉
     **/
        // const initializeWheel = async () => {
        //   const wheelData = await facade.apiService.getWheelPrize();
        //   state.list = wheelData.data;
        //   state.prizes = state.list.length;
        //   state.sectorAngle = 360 / state.prizes;
        // };


        // 取得轉盤資訊
    const getRoulette = async () => {
          const roulette = await BaseApi.getRoulette({type: 1})
          console.log("roulette", roulette)
          state.list = roulette.data  // 轉盤原始資料
          state.prizesLength = roulette.data.length  // 資料長度 = 分子
          state.sectorAngle = 360 / state.prizesLength; // 單片角度
        }

    //最大獎底色 white
    const bigPrize = (data: RouletteRecord[]) => {
      let mostBig = Number(data[0].worth)
      for(let i = 0; i < data.length; i ++) { // 取得最大
        if(Number(data[i].worth) > mostBig){
          mostBig = Number(data[i].worth)
        }
      }
      data.map((big)=>{
        if(Number(big.worth) == mostBig){ // 改變底色
          big.firstPrize = true
        }
      })
      state.wheelList = data
    }

    // 取得得獎名單
    const getRouletteRecord = async () => {
      const rouletteRecord = await BaseApi.getRouletteRecord()
      // console.log("rouletteRecord", rouletteRecord)
      // state.luckyList = rouletteRecord.data
    }

    onMounted(async () => {
      // await initializeWheel();
      wheelElt.value!.addEventListener("transitionstart", () => {
        console.log("anim start");
      })
      wheelElt.value!.addEventListener("transitionend", () => {
        console.log("animation has ended");
        state.stage = EStage.idle;
        state.counter++;
      })
      await getRoulette()  // 轉盤資料
      await bigPrize(state.list) //最大獎底色 white
      await getRouletteRecord()  // 得獎名單
    });

    return {
      ...toRefs(state),
      radius,
      wheelElt,
      spin,
      EStage,
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
        return `transform: rotate(${state.sectorAngle * idx}deg)`;
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
