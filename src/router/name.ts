export enum EApiPath {
  postSignUp = "/sign-up",
  getSignIn = "/sign-in",
  postTokenRefresh = "/user/refresh-token",

  postOTP = "/otp",
  postVerifyOTP = "/otp/verity",
  postThirdSignUp = "/sign-up/third",
  postThirdSignIn = "/sign-in/third",
  postForgotPassword = "/password",
  postVerifyOTPForPassword = "/password/otp",
  putResetPassword = "/password",
  getUserInfo = "/user-info",
  patchResetPassword = "/user/reset-password"
}

export enum ELoginTabs {
  signIn = "signIn",
  signUp = "signUp"
}

const RouterNames = {
  Home: "Home",
  SpinWheel: "SpinWheel",
  HomeLayout: "HomeLayout",

  NotFound: "NotFound",
  LoginLayout: "LoginLayout",
  LoginHome: "LoginHome",
  EmptyPage: "EmptyPage",

  //
  //    signin
  //
  SignIn: "SignIn",
  SignIn_OTP: "SignIn_OTP",
  SignIn_ForgotPwd: "SignIn_ForgotPwd",
  SignIn_UpdatePwd: "SignIn_UpdatePwd",

  //
  //    signup
  //
  SignUp: "SignUp",
  SignUp_ForgotPwd: "SignUp_ForgotPwd",
  SignUp_OTP: "SignUp_OTP",
  SignUp_Register: "SignUp_Register",

  //
  //    game
  //
  Game: "Game",

  //
  //    quest
  //
  Quest: "Quest",
  QuestDetail: "QuestDetail",
  ExpiredQuestDetail: "ExpiredQuestDetail",
  QuestUpload: "QuestUpload",

  //
  //    news
  //
  News: "News",
  NewsDetail: "NewsDetail",

  //
  //    friends
  //
  Friends: "Friends",

  //
  //    user
  //
  User: "User",
  Contact: "Contact",
  About: "About",
  Help: "Help",
  Withdraw: "Withdraw",
  WithdrawMoney: "WithdrawMoney",
  Wallet: "Wallet",
  EditWallet: "EditWallet",
  AddBankAccount: "AddBankAccount",
  Settings: "Settings",
  EditFundPassword: "EditFundPassword",
  SetFundPassword: "SetFundPassword",
  ResetFundPassword: "ResetFundPassword",
  VerifyEmail: "VerifyEmail",
  EditUserPassword: "EditUserPassword",
  InformVerified: "InformVerified",
  InviteFriends: "InviteFriends",
  UserVerifyEmail: "UserVerifyEmail",
  ContactLayout: "ContactLayout",
  ContactList: "ContactList",
  ContactQuestion: "ContactQuestion",
  //
  //      D E M O
  //
  Demo: "Demo",
  DemoWheel: "DemoWheel",
  DemoSector: "DemoSector",
  DemoLayout: "DemoLayout",
  DemoCounter: "DemoCounter",

};

export default RouterNames;
