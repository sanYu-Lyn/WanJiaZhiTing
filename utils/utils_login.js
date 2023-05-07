import http from '../http/http_do'
import persistence from './utils_persistence'
import log from './utils_log'

function login(userInfo, rawData, signature, encryptedData, iv, onStart, onSuccess, onFailed) {
  onStart()
  wx.login({
    success(res) {
      httpLogin(res.code, userInfo, rawData, signature, encryptedData, iv, onStart, onSuccess, onFailed)
    },
    fail(res) {
      onFailed(res.errMsg)
    }
  })
}

function httpLogin(code, userInfo, rawData, signature, encryptedData, iv, onStart, onSuccess, onFailed) {
  http.wxlogin(code, userInfo, rawData, signature, encryptedData, iv,
    () => {},
    res => {
      userInfo.token = res.data.token
      userInfo.phone = res.data.phone
      userInfo.sessionKey = res.data.session.sessionKey
      userInfo.isBinded = userInfo.phone != ""
      getApp().globalData.userInfo = userInfo;
      isBindPhone(userInfo, onStart, onSuccess, onFailed)
    },
    res => {
      onFailed(res)
    }
  );
}

function isBindPhone(userInfo, onStart, onSuccess, onFailed) {
  if (userInfo.isBinded) {
    syncUserCars(userInfo, onStart, onSuccess, onFailed)
  } else {
    onSuccess(false)
  }
}

function syncUserCars(userInfo, onStart, onSuccess, onFailed) {
  http.findBindCars(() => {},
    res => {
      persistence.setCarLicense(res.data)
      persistence.addUser(userInfo)
      getApp().globalData.userInfo = userInfo
      onSuccess(userInfo)
    },
    res => {
      onFailed(res)
    })
}

function bindPhone(phone, code, onStart, onSuccess, onFailed) {
  http.bindPhone(phone, code, onStart,
    res => {
      getApp().globalData.userInfo.isBinded = true
      getApp().globalData.userInfo.phone = phone
      syncUserCars(getApp().globalData.userInfo, onStart, onSuccess, onFailed)
    },
    res => {
      log.error(res.msg)
      onFailed(res)
    })
}

function logOut() {
  persistence.clear()
  getApp().globalData.userInfo = null
}

module.exports = {
  login: login,
  logOut: logOut,
  bindPhone: bindPhone,
}