import { ComputedRef, defineComponent, Ref, ref, watch } from "vue";

export
enum SpinWheelStage {
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
  private _spinCounter: number = 1;
  private _completer?: { resolve: any, reject: any };

  get stage(): SpinWheelStage {
    return this.state.stage!;
  }

  get sectorNumbers(): number {
    return this.state.dataList.length;
  }

  get sectorAngle(): number {
    return 360 / this.state.dataList.length;
  }

  constructor(
    public state: SpinWheelState<T>,
    private _onTransitionStart: () => void = () => {
    },
    private _onTransitionEnd: () => void = () => {
    },
    private speed: number = 30,
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

    // watch(
    //   () => [this.state.targetDegree, this.state.dataList],
    //   () => {
    //     console.log("on target degree updated:", state.targetDegree);
    //     state.element.style.transform = `rotate(${state.targetDegree}deg)`;
    //   }
    // );
  }

  protected _spinTo(condition: (elt: T) => boolean) {
    const initialSpeed = 360 * this.speed * this._spinCounter;
    const targetIndex = this.state.dataList.findIndex(condition);
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
