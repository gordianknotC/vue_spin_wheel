import { ComputedRef, defineComponent, Ref, ref, watch, UnwrapNestedRefs } from "vue";

const DEFAULT_CB = ()=>{};
const DEFAULT_SPEED = 30;

export enum SpinWheelStage {
  idle,
  spinning
}

export type SpinWheelState<T> = {
  element: HTMLElement,
  dataList: T[],
  initialDegree: number,
  targetDegree?: number,
  stage?: SpinWheelStage,
};

export class SpinWheel<T> {
  /** spin counter 計數，用來疊加 spin 度數，如第一次轉 1000 度，第二次 counter 疊加就變成 2000*/
  private _spinCounter: number = 1;
  /** 取 dart Completer 的概念，用來 complete spin 所返回的 Promise*/
  private _completer?: { resolve: any, reject: any };

  /** spin stage, SpinWheelStage.spinning | SpinWheelStage.idle*/
  get stage(): SpinWheelStage {
    return this.state.stage!;
  }

  /** sector 數量*/
  get sectorNumbers(): number {
    return this.state.dataList.length;
  }

  /** sector 大小(in degree)*/
  get sectorAngle(): number {
    return 360 / this.state.dataList.length;
  }

  constructor(
    public state: UnwrapNestedRefs<SpinWheelState<T>>,
    /** on transition animation start*/
    private _onTransitionStart: () => void = DEFAULT_CB,
    /** on transition animation end*/
    private _onTransitionEnd: () => void = DEFAULT_CB,
    /** default 30 */
    private speed: number = DEFAULT_SPEED,
  ) {
    this.state.targetDegree ??= 0;
    this.state.stage ??= SpinWheelStage.idle;
    const wheelElt: HTMLElement = this.state.element;

    wheelElt.ontransitionstart = () => {
      this.state.stage = SpinWheelStage.spinning;
      _onTransitionStart();
      console.log("start, set stage to", this.state.stage);
    };

    wheelElt.ontransitionend = () => {
      this.state.stage = SpinWheelStage.idle;
      this._spinCounter++;
      this._completer?.resolve(true);
      _onTransitionEnd();
      console.log("end, set stage to", this.state.stage);
    };
  }

  protected _spinTo(condition: (elt: T) => boolean) {
    const initialSpeed = 360 * this.speed * this._spinCounter;
    const targetIndex = (this.state.dataList as T[]).findIndex(condition);
    console.log("spin to index:", targetIndex);

    const targetDegree = this.sectorAngle * targetIndex - this.state.initialDegree;
    const shift = +this.sectorAngle / 2;
    this.state.targetDegree = -(initialSpeed + targetDegree + shift);
    console.log("set target degree to:", this.state.targetDegree);

    this.state.element.style.transform = `rotate(${this.state.targetDegree}deg)`;
  }

  async spin(condition: (elt: T) => boolean): Promise<boolean> {
    if (this.state.stage == SpinWheelStage.spinning)
      return Promise.resolve(false);

    const future = new Promise<boolean>((resolve, reject) => {
      this._completer = {resolve, reject};
    });
    this._spinTo(condition);
    return future;
  }
}
