import { AxiosResponse } from "axios";

import {
  RouletteResponse,
  RoulettePayload,
  RouletteRandomPayload,
  RouletteRandomResponse,
  RouletteRecordResponse,
  RouletteRecord, 
  RouletteRecordDefectResponse
} from "~/types/apiTypes";


class ApiService {

  async getRoulette(payload: RoulettePayload): Promise<RouletteResponse> {
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

  async getRouletteRandom(payload: RouletteRandomPayload): Promise<RouletteRandomResponse> {
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
    const response: RouletteRandomResponse = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette/random", payload);
  }

  async getRouletteRecord(): Promise<RouletteRecordResponse> {
    //fixme: temporary
    const record: RouletteRecord[] = [{
      create_datetime: "",
      id: 0,
      name: "",
      worth: "",
      end_datetime: "",
      firstPrize: false,
      reward_type: 0,
      start_datetime: "",
      type: 0,
      update_datetime: "",
    }];
    const response: RouletteRecordResponse = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette/record");
  }

  /** 不佳的 response 回傳格式, data 可能為 null
   * ### Defect 型別說明
    ```ts
    type DataResponse<T> = {
      data: T;
      pager?: Pager | null | undefined;
    };
    type RouletteRecordDefectResponse = DataResponse<RouletteRecord[] | null>;
    const response: RouletteRecordDefectResponse = {} as any;
    // 以下會錯誤
    assert(()=>response.data.length > 0);
    ```

    --- 

    ### 取用時注意修正
    data response 型別不一，可能為陣列也可能為 null, 使得 develop 在取用時需要進行以下操作

    ```ts
    function fetchData(){
      const response = await BaseApi.fetchData();
      return response.data ?? [];
    }
    ```
    ---

   */
  async getRouletteRecordDefect(): Promise<RouletteRecordDefectResponse> {
    //fixme: temporary
    const record: RouletteRecord[] = [{
      create_datetime: "",
      id: 0,
      name: "",
      worth: "",
      end_datetime: "",
      firstPrize: false,
      reward_type: 0,
      start_datetime: "",
      type: 0,
      update_datetime: "",
    }];
    const response: RouletteRecordResponse = {data: record};
    return Promise.resolve(response);
    // return this.get("/roulette/record");
  }
}


const BaseApi: ApiService = new ApiService();
export default BaseApi;
