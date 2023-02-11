import { AxiosResponse } from "axios";

import {
  RouletteResponse,
  roulettePayload,
  RouletteRandomPayload,
  RouletteRandom,
  RouletteRecordResponse,
 RouletteRecord, rouletteRecord
} from "~/types/apiTypes";


class ApiService {

  async getRoulette(payload: roulettePayload): Promise<RouletteResponse> {
    //fixme: temporary
    const redundant = {
      create_datetime: "",
      end_datetime: "",
      start_datetime: "",
      update_datetime: "",
      name: "",
      reward_type: 0,
      type: 0,
    };
    const length = 8;
    let i = -1;
    const record: RouletteRecord[] = (new Array(length)).fill(0).map((_)=>{
      i ++;
      let firstPrize = i == 3;
      return {
        ...redundant,
        firstPrize,
        id: i,
        worth: ((100) + (1000) * i).toString()
      }
    });
    const response: RouletteResponse = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette", payload);
  }

  async getRouletteRandom(payload: RouletteRandomPayload): Promise<RouletteRandom> {
    //fixme: temporary
    const record: RouletteRecord = {
      create_datetime: "",
      end_datetime: "",
      firstPrize: false,
      id: 0,
      name: "",
      reward_type: 0,
      start_datetime: "",
      type: 0,
      update_datetime: "",
      worth: ""
    };
    const response: RouletteRandom = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette/random", payload);
  }

  async getRouletteRecord(): Promise<RouletteRecordResponse> {
    //fixme: temporary
    const record: rouletteRecord[] = [{
      create_datetime: "",
      record_id: 0,
      username: "",
      worth: ""
    }];
    const response: RouletteRecordResponse = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette/record");
  }

}


const BaseApi: ApiService = new ApiService();
export default BaseApi;
