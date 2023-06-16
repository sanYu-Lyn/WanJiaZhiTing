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
const pay_out = (lsid, start, success, error) => {
  payParkingFeeByWallet(lsid, start,
    res => {
      if (res.data && res.data.wxpay) {
        requestWX(res.data.wxpay, success, error)
      } else {
        success(res)
      }
    }, error)
}

/**
 * 月卡购买
 * @param {*} type 0钱包支付 1微信支付
 */
const pay_choose = (parkId, carA, carB, startDate, monthCount, type, start, success, error) => {
  if (type == 0) {
    payMonthCardByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
  } else {
    payMonthCardByWX(parkId, carA, carB, startDate, monthCount, start,
      res => {
        requestWX(res.data, success, error)
      },
      error)
  }
}

const payMonthCardByWallet = (parkId, carA, carB, startDate, monthCount, start, success, error) => {
  http.payMonthCardByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
}

const payMonthCardByWX = (parkId, carA, carB, startDate, monthCount, start, success, error) => {
  http.payMonthCardByWX(parkId, carA, carB, startDate, monthCount, start, success, error)
}

const payParkingFeeByWallet = (lsid, start, success, error) => {
  http.payParkingFeeByWallet(lsid, start, success, error)
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
  pay_out: pay_out
}