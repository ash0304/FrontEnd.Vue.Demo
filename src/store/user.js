import { getToken, setToken, removeToken } from '../utils/auth'
import { getGamePlatform, getMemberPlatformBalance } from '../api/game'
import { siteInfo } from '../api/gameSite'

const state = {
  token: getToken(),
  account: '',
  balance: 0,
  lastLoginTime: null,
  walletList: null,
  csUrl: '',
  spinner: false,
  logoImg: '',
  LoginBonusStatus: 1,
  siteinfo: null,
  siteNotifyAmount: 0
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_BONUS: (state, LoginBonusStatus) => {
    state.LoginBonusStatus = LoginBonusStatus
  },
  SET_BALANCE: (state, balance) => {
    state.balance = balance
  },
  SET_LASTLOGINTIME: (state, lastLoginTime) => {
    state.lastLoginTime = lastLoginTime
  },
  SET_WALLETLIST: (state, walletList) => {
    state.walletList = walletList
  },
  SET_CSURL: (state, csUrl) => {
    state.csUrl = csUrl
  },
  SET_SPINNER: (state, spinner) => {
    state.spinner = spinner
  },
  SET_LOGOIMG: (state, logoImg) => {
    state.logoImg = logoImg
  },
  SET_SITETITLE: (state, siteTitle) => {
    state.siteTitle = siteTitle
  },
  SET_SITEINFO: (state, siteinfo) => {
    state.siteinfo = siteinfo
  },
  SET_SITENOTIFYAMOUNT: (state, siteNotifyAmount) => {
    state.siteNotifyAmount = siteNotifyAmount
  }
}

const actions = {
  login({ commit }, loginForm) {
    if (
      loginForm.LoginAccount === 'ash123' &&
      loginForm.Password === '123456'
    ) {
      commit('SET_TOKEN', 'token')
      setToken('token')
      return 'success'
    } else {
      return 'fail'
    }
  },
  getInfo({ commit }) {
    commit('SET_ACCOUNT', 'ash123')
    commit('SET_BALANCE', 12312321)
    commit('SET_LASTLOGINTIME', new Date(-10))
  },
  siteInfo({ commit }) {
    return new Promise((resolve, reject) => {
      siteInfo().then(response => {
        const { Code, Data } = response
        if (Code === 0) {
          commit('SET_CSURL', Data.OnlineService)
          commit('SET_LOGOIMG', Data.LogoImg)
          if (Data.QRCodeImg) {
            Data.QRCodeImg = process.env.VUE_APP_BASE_URL + Data.QRCodeImg
          }
          commit('SET_SITEINFO', Data)
          resolve(Data)
        }
      })
    })
  },
  logout({ commit }) {
    commit('SET_TOKEN', '')
    removeToken()
  },
  async getPlatformAmount({ commit }, PlatformID) {
    const platformQuery = {
      PlatformID
    }
    let amount
    await getMemberPlatformBalance(platformQuery).then(res => {
      if (res.Code === 0) {
        amount = res.Data
      } else if (res.Code === 402) {
        amount = 'err402'
      } else if (res.Code === 9999) {
        amount = 'err9999'
      } else {
        amount = 'err9999'
      }
    })
    return amount
  },
  getGameWallets({ commit }) {
    return new Promise((resolve, reject) => {
      let gameList
      getGamePlatform({ Mode: 1 })
        .then(response => {
          if (response.Code === 0) {
            gameList = response.Data
            if (gameList.length !== 0) {
              const functionWithPromise = async gamePlatform => {
                const platformQuery = {
                  PlatformID: gamePlatform.ID
                }
                let result
                await getMemberPlatformBalance(platformQuery)
                  .then(res => {
                    if (res.Code === 0) {
                      result = {
                        PlatformID: gamePlatform.ID,
                        PlatformName: gamePlatform.PlatformName,
                        amount: res.Data
                      }
                    } else {
                      result = {
                        PlatformID: gamePlatform.ID,
                        PlatformName: gamePlatform.PlatformName,
                        amount: '--'
                      }
                    }
                  })
                  .catch(() => {
                    result = {
                      PlatformID: gamePlatform.ID,
                      PlatformName: gamePlatform.PlatformName,
                      amount: '--'
                    }
                  })
                return Promise.resolve(result)
              }
              const anAsyncFunction = async platform => {
                return await functionWithPromise(platform)
              }
              // eslint-disable-next-line
              const getData = async () => {
                return await Promise.all(
                  gameList.map(gamePlatform => anAsyncFunction(gamePlatform))
                )
              }
              getData().then(res => {
                const walletList = res.filter(item => {
                  return item.PlatformID
                })
                commit('SET_WALLETLIST', walletList)
                resolve(walletList)
              })
            }
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  spinnerSwitch({ commit }, type) {
    if (type === 'open') {
      state.spinner = true
    }
    if (type === 'close') {
      setTimeout(() => {
        state.spinner = false
      }, 500)
    }
  },
  getSiteNotifyAmount({ commit }, amount) {
    if (amount.length === 0) {
      commit('SET_SITENOTIFYAMOUNT', 0)
    } else {
      const list = amount.filter(item => {
        return item.Status === 0
      })
      commit('SET_SITENOTIFYAMOUNT', list.length)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
