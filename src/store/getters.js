const getters = {
  token: state => state.user.token,
  account: state => state.user.account,
  balance: state => state.user.balance,
  loginBonusStatus: state => state.user.LoginBonusStatus,
  lastLoginTime: state => state.user.lastLoginTime,
  walletList: state => state.user.walletList,
  csUrl: state => state.user.csUrl,
  spinner: state => state.user.spinner,
  logoImg: state => state.user.logoImg,
  hasWithdrawalPassword: state => state.user.hasWithdrawalPassword,
  siteinfo: state => state.user.siteinfo,
  siteNotifyAmount: state => state.user.siteNotifyAmount
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // avatar: state => state.user.avatar,
  // money: state => state.user.money,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  // permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs,
  // edit: state => state.user.edit
}
export default getters
