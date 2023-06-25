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
  var deviceno = getApp().globalData.task.id
  var socket = '1'
  if (getApp().globalData.task.id.indexOf(',') != -1) {
    const arr = deviceno.split(',')
    deviceno = arr[0]
    socket = arr[1]
  }

  console.log('----------->to = %s deviceno = %s', to, deviceno)

  if (to == 'in') {
    wx.navigateTo({
      url: '../fee_cars/fee_cars?to=in&id=' + deviceno,
    })
    return
  }

  if (getApp().globalData.task.to === 'out') {
    http.scanOut(deviceno,
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
      url: '../fee_cars/fee_cars?to=parkout',
    })
    return
  }

  requestDevice(deviceno, socket)
}

const requestDevice = function (deviceno, socket) {
  http.deviceType(deviceno,
    () => wx.showLoading(),
    res => {
      if (res.data.type === 'car') {
        chargeCar(res.data.device, socket)
      } else if (res.data.type === 'motor') {
        chargeMoto(res.data.device, socket)
      } else {
        wx.reLaunch({
          url: '../pages/park_list/park_list',
        })
      }
    },
    res => {}
  )
}

const chargeCar = function (device, socket) {
  if (device.status == 0) {
    wx.redirectTo({
      url: '../charge_start/charge_start?device=' + JSON.stringify(device) +
        '&socket=' + socket
    })
  } else if (device.status == 1) {
    const to_pay = (ls, device) => {
      wx.redirectTo({
        url: '../charge_pay/charge_pay?ls=' + JSON.stringify(ls) +
          '&device=' + JSON.stringify(device)
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

    http.chargeCurrent(
      () => wx.showLoading(),
      res => {
        if (device.deviceno == res.data.deviceinfo.deviceno) {
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
        url: '../pages/park_list/park_list',
      })
    }, 2000);
  }
}

const chargeMoto = function (device, socket) {
  if (device.status == 0) {
    wx.redirectTo({
      url: '../charge_start/charge_start?device=' + JSON.stringify(device) +
        '&moto=true' + '&socket=' + socket
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

    http.chargeCurrentMoto(
      () => wx.showLoading(),
      res => {
        if (deviceno == res.data.deviceinfo.deviceno) {
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
        url: '../pages/park_list/park_list',
      })
    }, 2000);
  }
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