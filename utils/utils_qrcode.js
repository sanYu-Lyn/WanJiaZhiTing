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

  console.log('----------->to = %s id = %s', to, id)

  if (to == 'in') {
    wx.navigateTo({
      url: '../fee_cars/fee_cars?to=in&id=' + id,
    })
    return
  }

  if (getApp().globalData.task.to === 'out') {
    http.scanOut(id,
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        res.data.status = 'needToPay'
        const params = encodeURIComponent(JSON.stringify(res.data))
        wx.redirectTo({
          url: '../fee_pay/fee_pay?order=' + params,
        })
      },
      res => {
        wx.hideLoading()
        toast.normal('未查询到停车订单');
        setTimeout(() => {
          wx.reLaunch({
            url: '../fee_bill/fee_bill',
          })
        }, 2000);
      }
    )
    return
  }

  if (getApp().globalData.task.to === 'parkout') {
    wx.redirectTo({
      url: '../fee_cars/fee_cars?to=parkout&id=' + id,
    })
    return
  }

  if (getApp().globalData.task.to === 'chargecar') {
    http.chargeDeviceDetail(id,
      () => wx.showLoading(),
      res => {
        if (res.data.status == 0) {
          wx.redirectTo({
            url: '../charge_start/charge_start?device=' + JSON.stringify(res.data),
          })
        } else if (res.data.status == 1) {
          const to_pay = (ls, device) => {
            wx.redirectTo({
              url: '../charge_pay/charge_pay?ls=' + JSON.stringify(ls) +
                '&device=' + JSON.stringify(device),
            })
          }

          const no_pay = () => {
            toast.normal('当前充电桩未查询到充电订单');
            setTimeout(() => {
              wx.redirectTo({
                url: '../charge_moto_history/charge_moto_history',
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
        } else {
          toast.normal('设备不可用');
          setTimeout(() => {
            wx.reLaunch({
              url: '../pages/park_list/park_list.js',
            })
          }, 2000);
        }
      },
      res => {
        wx.hideLoading()
      }
    )
    return
  }

  if (getApp().globalData.task.to === 'chargemoto') {
    http.chargeMotoDeviceDetail(id,
      () => wx.showLoading(),
      res => {
        if (res.data.status == 0) {
          wx.redirectTo({
            url: '../charge_start/charge_start?device=' + JSON.stringify(res.data) + '&moto=true',
          })
        } else if (res.data.status == 1) {
          const to_pay = (ls, device) => {
            wx.redirectTo({
              url: '../charge_pay/charge_pay?ls=' + JSON.stringify(ls) +
                '&device=' + JSON.stringify(device),
            })
          }

          const no_pay = () => {
            toast.normal('当前充电桩未查询到充电订单');
            setTimeout(() => {
              wx.redirectTo({
                url: '../charge_history/charge_history',
              })
            }, 2000);
          }

          http.chargeCurrentMoto(
            () => wx.showLoading(),
            res => {
              if (id == res.data.deviceinfo.id) {
                res.data.ls.isMoto = true
                to_pay(res.data.ls, res.data.deviceinfo)
              } else {
                no_pay()
              }
            },
            res => no_pay()
          )
        } else {
          toast.normal('设备不可用');
          setTimeout(() => {
            wx.reLaunch({
              url: '../pages/park_list/park_list.js',
            })
          }, 2000);
        }
      },
      res => {
        wx.hideLoading()
      }
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