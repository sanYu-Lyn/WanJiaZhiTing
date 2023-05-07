import http from '../http/http_do'
import persistence from './utils_persistence'

const pay = (parkId, carA, carB, startDate, monthCount, type, start, success, error) => {
  // var quickPay = persistence.getPaySettings();

  // if (quickPay) {
  //   payByWallet(orderId, couponId, amt, start, success, error)
  //   return
  // }

  payByWX(orderId, couponId, start,
    res => {
      requestWX(res.data, success, error)
    },
    error)
}

/**
 * 公众号进出场
 * @param {*} type 0钱包支付 1微信支付
 */
const pay_out = (parkid, carno, type, start, success, error) => {
  http.parkOut(parkid, carno,
    start,
    res => {
      if (type == 0) {
        // payByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
      } else {
        requestWX(res.data.wxpay, success, error)
      }
    },
    error
  )

}

/**
 * 扫码进出场
 * @param {*} type 0钱包支付 1微信支付
 */
const scan_out = (order, type, start, success, error) => {
  if (type == 0) {
    // payByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
  } else {
    requestWX(res.data.wxpay, success, error)
  }
}

/**
 * 月卡购买
 * @param {*} type 0钱包支付 1微信支付
 */
const pay_choose = (parkId, carA, carB, startDate, monthCount, type, start, success, error) => {
  if (type == 0) {
    payByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
  } else {
    payByWX(parkId, carA, carB, startDate, monthCount, start,
      res => {
        requestWX(res.data, success, error)
      },
      error)
  }
}

const payByWallet = (parkId, carA, carB, startDate, monthCount, start, success, error) => {
  http.payByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
}

const payByWX = (parkId, carA, carB, startDate, monthCount, start, success, error) => {
  http.payByWX(parkId, carA, carB, startDate, monthCount, start, success, error)
}

const requestWX = (res, success, error) => {
  wx.requestPayment({
    timeStamp: res.timeStamp,
    nonceStr: res.nonceStr,
    package: res.packageValue,
    signType: res.signType,
    paySign: res.paySign,
    success(res) {
      success(res);
    },
    fail(res) {
      error(res)
    }
  })
}

module.exports = {
  pay: pay,
  pay_choose: pay_choose,
  pay_out: pay_out,
  scan_out: scan_out
}