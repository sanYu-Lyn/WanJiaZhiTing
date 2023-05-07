import toast from '../utils/utils_toast'
import base from './http_base'
import persistence from '../utils/utils_persistence'

/**
 * 供外部post请求调用
 */
function post(url, params, onStart, onSuccess, onFailed) {
  wx.checkSession({
    success: (res) => {
      request(url, true, params, "POST", onStart, onSuccess, onFailed);
    },
    fail: (res) => {
      console.log('########################重新登录####################################')
      wx.login({
        success(res) {
          request(url, true, params, "POST", onStart, onSuccess, onFailed);
        },
        fail(res) {
          doFail({
            msg: res.errMsg,
            code: -1
          }, onFailed)
        }
      })
    }
  })
}

/**
 * 供外部post请求调用
 */
function postNoToken(url, params, onStart, onSuccess, onFailed) {
  wx.checkSession({
    success: (res) => {
      request(url, false, params, "POST", onStart, onSuccess, onFailed);
    },
    fail: (res) => {
      console.log('########################重新登录####################################')
      wx.login({
        success(res) {
          request(url, false, params, "POST", onStart, onSuccess, onFailed);
        },
        fail(res) {
          doFail({
            msg: res.errMsg,
            code: -1
          }, onFailed)
        }
      })
    }
  })
}

/**
 * 供外部get请求调用
 */
function get(url, params, onStart, onSuccess, onFailed) {
  wx.checkSession({
    success: (res) => {
      request(url, true, params, "GET", onStart, onSuccess, onFailed);
    },
    fail: (res) => {
      console.log('########################重新登录####################################')
      wx.login({
        success(res) {
          request(url, true, params, "GET", onStart, onSuccess, onFailed);
        },
        fail(res) {
          doFail({
            msg: res.errMsg,
            code: -1
          }, onFailed)
        }
      })
    }
  })
}

/**
 * 供外部get请求调用
 */
function upload(url, path, params, onStart, onSuccess, onFailed) {
  _upload(url, path, params, onStart, onSuccess, onFailed);
}

/**
 * 获取二进制图片 
 */
function getImage(url, path, params, onStart, onSuccess, onFailed) {
  _getImage(url, path, params, onStart, onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onStart 开始请求,初始加载loading等处理
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */
function request(url, needToken, params, method, onStart, onSuccess, onFailed) {
  base.request(url, needToken, params, method, onStart,
    res => {
      //刷新token
      if (res.header["New-Token"]) {
        getApp().globalData.userInfo.token = res.header["New-Token"]
        persistence.addUser(getApp().globalData.userInfo)
      }
      onSuccess(res.data)
    },
    res => {
      doFail(res, onFailed)
    })
}

function _upload(url, path, params, name, onStart, onSuccess, onFailed) {
  wx.checkSession({
    success: (res) => {
      base.upload(url, path, params, name, onStart, onSuccess,
        res => {
          doFail(res, onFailed)
        })
    },
    fail: (res) => {
      //this.login();
    }
  })
}

function _getImage(url, onStart, onSuccess, onFailed) {
  wx.checkSession({
    success: (res) => {
      base.getImage(url, onStart, onSuccess,
        res => {
          doFail(res, onFailed)
        })
    },
    fail: (res) => {
      //this.login();
    }
  })
}

function doFail(res, onFailed) {
  if (res.msg == 'request:fail timeout') {
    toast.show('请求服务器超时', 3000);
    onFailed(res)
  } else if (res.code == 1002) {
    wx.reLaunch({
      url: '../base_result/base_result?src=6',
    })
  } else if (res.code > 0) {
    toast.show(res.msg, 3000);
  } else if (res.code == 100 || res.code == 101) {
    persistence.clear();
    getApp().globalData.userInfo = null;
    wx.navigateTo({
      url: '../base_login/base_login',
    })
  } else {
    toast.show(res.msg, 3000)
    onFailed(res)
  }
}

module.exports = {
  postRequest: post,
  postNoTokenRequest: postNoToken,
  getRequest: get,
  upload: upload,
  getImage: getImage
}