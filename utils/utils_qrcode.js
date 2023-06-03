import http from '../http/http_do'
import toast from '../utils/utils_toast'

const doTask = function () {
  if (!getApp().globalData.task) {
    return
  }

  if (!checkLoginState()) {
    return
  }

  var to = getApp().globalData.task.to
  var id = getApp().globalData.task.id

  console.log('to = %s id = %s', to, id)

  if (to == 'in') {
    wx.navigateTo({
      url: '../fee_cars/fee_cars?to=in&id=' + id,
    })
    return
  }

  if (getApp().globalData.task.to === 'out') {
    http.scanOut(id, '桂A88888',
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        res.data.status = 'needToPay'
        const params = encodeURIComponent(JSON.stringify(res.data))
        wx.redirectTo({
          url: '../fee_pay/fee_pay?order=' + params,
        })
      },
      res => wx.hideLoading()
    )
    return
  }

  if (getApp().globalData.task.to === 'parkout') {
    wx.redirectTo({
      url: '../fee_cars/fee_cars?to=parkout&id=' + id,
    })
    return
  }

  if (getApp().globalData.task.to === 'chargestart') {
    http.chargeDeviceDetail(id,
      () => wx.showLoading(),
      res => {
        wx.redirectTo({
          url: '../charge_start/charge_start?device=' + JSON.stringify(res.data),
        })
      },
      res => {
        wx.hideLoading()
      }
    )
    return
  }

  if (getApp().globalData.task.to === 'chargeend') {
    const to_pay = (ls, device) => {
      wx.redirectTo({
        url: '../charge_pay/charge_pay?ls=' + JSON.stringify(ls) +
          '&device=' + JSON.stringify(device),
      })
    }

    const no_pay = () => {
      toast.normal('当前充电桩未查询到充电信息');
      setTimeout(() => {
        wx.redirectTo({
          url: '../charge_history/charge_history',
        })
      }, 2000);
    }

    http.chargeCurrent(
      () => wx.showLoading(),
      res => {
        if (id == res.data.deviceinfo.id) {
          to_pay(res.data.ls, res.data.deviceinfo)
        } else {
          no_pay()
        }
      },
      res => no_pay()
    )
    return
  }

  wx.navigateBack()
}

/**
 *检测用是否登录，未登录跳转到登录界面
 */
const checkLoginState = function () {
  if (!getApp().globalData.userInfo) {
    wx.navigateTo({
      url: '../base_login/base_login',
    })
    return false //未登录
  }
  return true //已登录
}

module.exports = {
  doTask: doTask,
}