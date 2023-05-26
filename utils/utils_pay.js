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
        // payMonthCardByWallet(parkId, carA, carB, startDate, monthCount, start, success, error)
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
const scan_out = (deviceno, carno, type, start, success, error) => {
  if (type == 0) {
    payParkingFeeByWallet(deviceno, carno, start, success, error)
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

const payParkingFeeByWallet = (deviceno, carno, start, success, error) => {
  http.payParkingFeeByWallet(deviceno, carno, start, success, error)
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