import numeral from "numeral";

export class NumeralClass {
  numeral: typeof numeral;
  constructor(){
    this.numeral = numeral;
  }
  /** 將取得的值轉換為number或null */
  getNumber(val: any, defaults: number | null = null): number | null {
    return numeral(val).value();
  }

  asChannelWeight(val: number | string): string{
    return numeral(val).divide(100).format('0.00');
  }

  asFloat(val: number | string, decimals: number = 2): string{
    return numeral(val).format(`0,0.${"0".repeat(decimals)}`, Math.floor);
  }

  asReadableDollar(val: number | string, decimals: number = 2){
    return `₹ ${this.asFloat(val, decimals)}`
  }

}



export
const numeralHelper = new NumeralClass();
