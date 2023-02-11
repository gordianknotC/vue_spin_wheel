import type {
  UnwrapRef, PropType, Prop, ComponentPropsOptions,
  Ref, ComputedRef, ToRefs, ReactiveEffect, UnwrapNestedRefs
} from "vue";
import {watch} from "~/appCommon/base/vueTypes";

enum SpinWheelStage {
  idle,
  spinning
}

type SpinWheelState<T> = {
  element: HTMLElement,
  dataList: T[],
  initialDegree: number,
  targetDegree?: number,
  stage?: SpinWheelStage,
};

export class SpinWheel<T> {
  private _spinCounter: number = 1;
  private _completer: { resolve: any, reject: any };

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
    };

    wheelElt.ontransitionend = () => {
      this.state.stage = SpinWheelStage.idle;
      this._spinCounter++;
      this._completer.resolve(true);
      _onTransitionEnd();
    };

    watch(
      () => state.targetDegree,
      () => {
        state.element.style.transform = `rotate(${state.targetDegree}deg)`;
      }
    );
  }

  protected _spinTo(condition: (elt: T) => boolean) {
    let acc = 0;
    const state = this.state;
    const initialSpeed = 360 * this.speed * this._spinCounter;
    const targetIndex = state.dataList.findIndex(condition);
    const targetDegree = this.sectorAngle * targetIndex - state.initialDegree;
    const shift = +this.sectorAngle / 2;
    state.targetDegree = -(initialSpeed + targetDegree + shift);
  }

  async spin(condition: (elt: T) => boolean): Promise<boolean> {
    if (this.state.stage == SpinWheelStage.spinning)
      return;

    const future = new Promise<boolean>((resolve, reject) => {
      this._completer = {resolve, reject};
    });
    this._spinTo(condition);
    return future;
  }
}
