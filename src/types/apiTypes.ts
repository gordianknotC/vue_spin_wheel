import { Optional } from "~/appCommon/base/baseApiTypes";

export type ErrorResponse = {
  error_code: number;
  error_key: string;
  error_msg: string;
  message: string;
};

export type SuccessResponse = {
  succeed: boolean;
};

export type DataResponse<T> = {
  data: T;
  pager?: Pager | null | undefined;
};

/** pagination */
export type Pager = {
  page: number;
  pages: number;
  per_page: number;
  /** 所有資料量 all data rows = total = per_page * estimated_pages*/
  total: number;
};

export type Response<T> = DataResponse<T> | ErrorResponse;

/*
 *
 *
 *  e n u m
 *
 * */
export enum ERole {
  UNKNOWN = 0,
  ADMIN = 1,
  USER = 2
}

export enum EWithdrawStatus {
  Verifying = 1, // 驗證中
  Failure = 2, // 失敗
  Success = 3 // 成功
}
// 任務 tab
export const MissionStatus = [
  {
    type: 1,
    text: "Read"
  },
  {
    type: 2,
    text: "Watch"
  },
  {
    type: 3,
    text: "Share"
  },
  {
    type: 4,
    text: "Download"
  }
];

// news tab
export const newsCategory = [
  {
    type: 1,
    text: "All"
  },
  {
    type: 2,
    text: "Cricket"
  },
  {
    type: 3,
    text: "Football"
  },
  {
    type: 4,
    text: "Basketball"
  },
  {
    type: 5,
    text: "Baseball"
  },
];

/**
 *
 *
 *        U S E R
 *
 *
 * */

//
//  POST /otp
//
export type GenerateOTPPayload = {
  phone_number: string;
};

export type GenerateOTPResponse = SuccessResponse;

//
//    POST /otp/verify
//
export type OTPVerificationPayload = {
  phone_number: string;
  verification_code: string;
};

export type OTPVerificationResponse = SuccessResponse;

//
//  POST /sign-up
//

export type SignupPayload = {
  username: string;
  password: string;
  phone_number: string;
  invite_code?: string
};
export type SignupResponseRecord = {
  email: Optional<string>;
  id: number;
  phone_number: string;
  refresh_token: string;
  token: string;
  username: string;
};
export type SignupPayloadResponse = DataResponse<SignupResponseRecord>;

//
//    GET /sign-in
//
export type LoginPayload = {
  username: string;
  password: string;
};
export type LoginResponseRecord = {
  email: Optional<string>;
  id: number;
  phone_number: string;
  refresh_token: string;
  token: string;
  is_set_fund_password: boolean;
  is_email_verified: boolean;
  username: string;
};
export type LoginResponse = DataResponse<LoginResponseRecord>;

//
//    POST /sign-up/third
//
export type ThirdPartySignUpPayload = {
  third_party: string;
  access_token: string;
  invite_code?: string
};

export type ThirdPartySignUpResponseRecord = {
  email: Optional<string>;
  id: number;
  phone_number: string;
  refresh_token: string
  token: string;
  username: string;
};

export type ThirdPartySignUpResponse =
  DataResponse<ThirdPartySignUpResponseRecord>;

//
//    POST /sign-in/third
//
export type ThirdPartyLoginPayload = {
  third_party: string;
  access_token: string;
};
export type ThirdPartyLoginResponseRecord = {
  email: Optional<string>,
  id: number,
  phone_number: string,
  refresh_token: string,
  token: string,
  username: string
};
export type ThirdPartyLoginResponse = DataResponse<ThirdPartyLoginResponseRecord>;

//
//    POST /user/refresh-token
//
export type RefreshAuthPayload = {
  refresh_token: string;
};
export type RefreshAuthResponse = {
  data: {
    token: string;
  };
};

//  手機送出忘記密碼請求
//
//  POST /password
//
export type ForgotPasswordPayload = {
  phone_number: string;
};

export type ForgotPasswordResponse = SuccessResponse;

// 驗證手機送出忘記密碼請求
//
// POST /password/otp
//
export type ForgotPasswordVerificationPayload = {
  phone_number: string;
  verification_code: string;
};

export type ForgotPasswordVerificationResponse = SuccessResponse;

//  重設密碼
//  PUT /password
//
export type ResetPasswordPayload = {
  phone_number: string;
  new_password: string;
};
export type ResetPasswordResponse = SuccessResponse;

//
// GET /user-info
//

export type UserInfoPayload = {};
export type UserInfoResponseRecord = {
  create_datetime: string;
  email: Optional<string>;
  id: number;
  nickname: Optional<string>;
  phone_number: string;
  register_type: ERole;
  uid: string;
  is_set_fund_password: boolean;
  is_email_verified: boolean;
  username: string;
};
export type UserInfoResponse = DataResponse<UserInfoResponseRecord>;

export type getAvatar = {
  context: string;
};

export type putAvatarPayload = {
  context: string;
};

export type getAvatarResponse = DataResponse<getAvatar>;

//
//    PATCH /user/reset-password
//
export type UpdatePasswordPayload = {
  old_password: string;
  new_password: string;
};

export type UpdatePasswordResponse = SuccessResponse;

// 修改提款密碼：(第一次)
// endpoint
// PUT /set-fund-password
export type SetFundPasswordPayload = {
  fund_password: string;
};

export type SetFundPasswordResponse = SuccessResponse;

// 修改提款密碼
// endpoint
// PUT /reset-fund-password
export type EditFundPasswordPayload = {
  old_fund_password: string;
  new_fund_password: string;
};

export type EditFundPasswordResponse = SuccessResponse;

// 修改信箱: 寄驗證
// endpoint
// POST /user/email
export type VerifyEmailPayload = {
  email: string;
};
export type VerifyEmailResponse = SuccessResponse;

// 修改信箱: 驗證+修改
// endpoint
// PATCH /user/email
export type UpdateEmailPayload = {
  email: string;
  token: string;
};
export type UpdateEmailResponse = DataResponse<{
  email: string;
  token: string;
}>;

// todo:
// 修改暱稱
// endpoint
// PATCH /user/nickname

export type GetFeedback = {
  user_id: number;
  id: number;
  ticket_no: string;
  title: string;
  content: string;
  email: string;
  remark: string;
  contexts: string[];
  create_datetime: string;
};

export type GetFeedbackPayload = Partial<{
  page: number;
  per_page: number;
  keyword: string;
  feedback_ticket_id?: number;
}>;

export type GetFeedbackResponse = DataResponse<GetFeedback[]>;

export type PostFeedBack = {
  user_id: number;
  id: number;
  title: string;
  ticket_no: string;
  content: string;
  email: string;
  remark: string;
};

export type PostFeedbackPayload = {
  title: string;
  content: string;
  email: string;
  contexts: string[];
  remark?: string;
};

export type PostFeedbackResponse = DataResponse<PostFeedBack>;

export type GetAboutUs = {
  type: number;
  language: string;
  content: string;
  id: number;
};

export type GetAboutUsResponse = DataResponse<GetAboutUs>;

/**
 *
 *        C O N T A C T
 *
 *
 * */

/**
 *
 *        P O L I C Y
 *
 *
 * */

/**
 *
 *        W A L L E T
 *
 *
 * */
// GET /wallet/balance

export type Balance = {
  coin_balance: string;
  pay_out_balance: string;
};
export type GetBalanceRes = DataResponse<Balance>;

/**
 *
 *        G A M E
 *
 *
 * */

export type GetGame = {
  id: number;
  name: string;
  update_datetime: string;
  create_datetime: string;
  mission: GameMission[]

  game_schedule: number  // 有幾筆 complete_datetime != null
  total_worth: number  // total worth
  complete_worth: number // 完成的 worth
  progressWidth: any // bar 寬度
};

export type GameMission = {
  id: number;
  game_id: number;
  title: string;
  worth: number; // 單筆任務獎金
  content: string;
  target_key: string;
  target_value: number;
  create_datetime: string;
  update_datetime: string;
  complete_datetime: string; //  遊戲任務完成的時間 有就是完成了
}


export type GetGameResponse = DataResponse<GetGame[]>;

/**
 *
 *        A C C O U N T
 *
 *
 * */
// GET /account
export type GetAccountPayload = {
  id?: number;
};
export type GetAccount = {
  id: number;
  full_name: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  ifsc_code: string;
  is_default: boolean;
  remark?: string;
  create_datetime: string;
};
export type GetAccountRes = DataResponse<GetAccount[]>;

// POST /account
export type PostAccountPayload = {
  full_name: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  ifsc_code: string;
  fund_password: string;
  remark?: string;
  is_default?: boolean;
};
export type PostAccountRes = DataResponse<GetAccount>;

// PUT /account/<int:account_id>
export type PutAccountPayload = {
  account_id: number;
  fund_password: string;

  ifsc_code?: string;
  account_name?: string;
  account_number?: string;
  full_name?: string;
  bank_name?: string;
  remark?: string;
  is_default?: boolean;
};
export type PutAccountRes = DataResponse<GetAccount>;

// DELETE /account/<int:account_id>
export type DelAccountPayload = {
  account_id: number;
  fund_password: string;
};
export type DelAccountRes = SuccessResponse;

/**
 *
 *        W I T H D R A W
 *
 *
 * */
// GET /withdraw
export type GetWithdraw = {
  id: number;
  ticket_no: string;
  user_id: number;
  amount: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  ifsc_code: string;
  status: number;
  remark: string;
  create_datetime: string;
};
export type GetWithdrawRes = DataResponse<GetWithdraw[]>;

export type GetWithdrawPayload = {
  start_date?: string;
  end_date?: string;
};
// POST /withdraw
export type PostWithdrawPayload = {
  amount: number;
  account_id: number;
  fund_password: string;
  remark: string;
};
export type PostWithdrawResponse = DataResponse<GetWithdraw>;

/**
 *
 *       A N N O U N C E M E N T
 *
 *
 * */
// GET /announcement
export type announcementPayload = {
  announcement_id?: number
}
export type announcement = {
  id: number,
  title: string,
  content: string,
  author_id: number
  is_active: boolean,
  create_datetime: string

}
export type announcementRes = DataResponse<announcement[]>


/**
 *
 *        Q U E S T
 *
 *
 * */
// GET /mission
export type GetQuest = {
  action_type: number; // 任務動作的 type, img 的依據
  /*
  * READ = 1 # 閱讀
  * WATCH = 2 # 觀看
  * SHARE = 3 # 分享
  * DOWNLOAD = 4 # 下載
  *
  * */
  amount?: number; // 接取任務的次數
  content: string;
  create_datetime: string;
  end_datetime?: string;  // 過期日期
  finish_datetime?: string;  // 完成日期
  id: number;
  reward_type: number; // 獎勵的種類 coin, money
  start_datetime: string;
  target_link: string;
  title: string;
  type: number; // for 管理員, 任務種類
  type_name: string;
  update_datetime: string;
  worth: number; // 獎金
  status?: number;
  /*
   * NULL  # 沒接任務
   * PROCESSING = 1 # 進行中（初始狀態）
   * CANCEL = 2 # 取消
   * VERIFYING = 3 # 審核中
   * SUCCESS = 10 # 審核通過
   * */
  received?: boolean // 在 quest list 判斷 status 是否 null 傳回是否承接
  expired?: boolean // 在 quest list 判斷 end date time 是否 null 傳回是否承接
};
export type GetQuestRes = DataResponse<GetQuest[]>;

export type GetQuestPayload = {
  reward_type?: number;
  questId?: number;
};

// POST /mission/<int:extra_mission_id>
export type PostQuestPayload = {
  extra_mission_id: number;
  reward_type: number
};

export type PostQuestRes = {
  create_datetime: string;
  id: number;
  mission_id: number;
  status: number;
  ticket_no: string;
  update_datetime: string;
  user_id: number;

};



// POST /mission/image/<int:extra_mission_id>
export type PostUploadImgPayload = {
  extra_mission_id: number
  context: string
}
export type PostUploadImgRes = SuccessResponse;

// GET /mission/image/<int:extra_mission_id>
export type GetQuestImgPayload = {
  extra_mission_id: number
}
export type GetQuestImg = {
  datetime: string
  contexts: string
};
export type GetQuestImgRes = DataResponse<GetQuestImg[]>

/**
 *      W H E E L
 *
 * */
// fake data
// export type Prize = {
//   item: string;
//   firstPrize: boolean;
// };
//
// export type PrizeList = Prize[];

// GET /roulette
export type roulettePayload = {
  type: number
}
export type RouletteRecord = {
  create_datetime: string
  end_datetime: string
  id: number
  name: string
  reward_type: number
  start_datetime: string
  type: number
  update_datetime: string

  worth: string

  firstPrize: boolean
}
export type RouletteResponse = DataResponse<RouletteRecord[]>

//GET /roulette/random
export type RouletteRandomPayload = roulettePayload
export type RouletteRandom = DataResponse<RouletteRecord>

// GET /roulette/record
export type rouletteRecord = {
  create_datetime: string
  record_id: number
  username: string
  worth: string
}
export type RouletteRecordResponse = DataResponse<rouletteRecord[]>
