import proxy from './http_proxy'

import {
  BASE_URL
} from '../config/service'
import {
  keystore
} from '../config/keystore';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:登录注册相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 获取短信验证码
 * @param {*} phone 电话号码
 */
const getMessageCode = function (phone, onStart, onSuccess, onError) {
  var params = {
    mobile: phone
  }
  proxy.postRequest(BASE_URL + '/sms/getCode', params, onStart, onSuccess, onError);
}

/**
 * 验证码登录
 * @param {*} phone 电话号码
 * @param {*} code 验证码
 */
const login = function (phone, code, onStart, onSuccess, onError) {
  var params = {
    mobile: phone,
    validCode: code,
  }
  proxy.postRequest(BASE_URL + '/sms/login', params, onStart, onSuccess, onError);
}

/**
 * 微信登录
 * @param {string} code 用户code
 */
const wxlogin = function (code, user, rawData, signature, encryptedData, iv, onStart, onSuccess, onError) {
  var params = {
    appid: keystore.APP_ID,
    avatarurl: user.avatarUrl,
    code: code,
    gender: user.gender,
    nickname: user.nickName,
  }
  proxy.postNoTokenRequest(BASE_URL + '/info/wxlogin', params, onStart, onSuccess, onError);
}

/**
 * 是否绑定了手机号
 */
const isBindPhone = function (onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/users/isMobileBinded', params, onStart, onSuccess, onError);
}

/**
 * 绑定了手机号
 */
const bindPhone = function (mobile, validCode, onStart, onSuccess, onError) {
  var params = {
    mobile: mobile,
    validCode: validCode
  }
  proxy.postRequest(BASE_URL + '/users/my/bindMobile', params, onStart, onSuccess, onError);
}

/**
 * 解析用户加密手机号
 */
const decryptPhone = function (encryptedData, iv, sessionKey, onStart, onSuccess, onError) {
  var params = {
    appid: keystore.APP_ID,
    encryptedData: encryptedData,
    iv: iv,
    sessionKey: sessionKey
  }
  proxy.postRequest(BASE_URL + '/user/phone', params, onStart, onSuccess, onError);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:登录注册相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:用户相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 查询用户信息
 * @param {*} userId 用户id
 */
const getUser = function (userId, onStart, onSuccess, onError) {
  var params = {
    userId: userId,
  }
  proxy.getRequest(BASE_URL + '/users', params, onStart, onSuccess, onError);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:用户相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:车辆相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 绑定车牌
 * @param {*} carNo  车牌
 */
const bindCarNo = function (carNo, color, onStart, onSuccess, onError) {
  var params = {
    carno: carNo,
    // plateColor: color
  }
  proxy.postRequest(BASE_URL + '/car/bindUserCar', params, onStart, onSuccess, onError);
}

/**
 * 解绑车牌
 * @param {*} carId  车牌
 */
const unbindCarNo = function (carno, onStart, onSuccess, onError) {
  var params = {
    carno: carno
  }
  proxy.postRequest(BASE_URL + '/car/unBindUserCar', params, onStart, onSuccess, onError);
}

/**
 * 查询用户车辆清单
 */
const findBindCars = function (onStart, onSuccess, onError) {
  var params = {}
  proxy.postRequest(BASE_URL + '/car/getUserCarList', params, onStart, onSuccess, onError);
}

/**
 * 查询车辆的位置
 */
const findCarPostion = function (carId, onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/cars/getParkLocation/' + carId, params, onStart, onSuccess, onError);
}

/** 
 * 上传行驶证照片
 */
const uploadCarCertif = function (path, carId, name, onStart, onSuccess, onError) {
  var params = {}
  proxy.upload(BASE_URL + '/cars/lock/' + carId, path, params, name, onStart, onSuccess, onError);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:车辆相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START: 停车缴费相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 待支付的订单
 * @param {*} carNo 车牌号
 */
const parkOrderNoPay = function (carNo, pageNumber, onStart, onSuccess, onError) {
  var params = {
    carNo: carNo,
    pageNumber: pageNumber
  }
  proxy.getRequest(BASE_URL + '/orders/my/parking/needToPay', params, onStart, onSuccess, onError);
}

/**
 * 已经支付的订单
 */
const parkOrderPaid = function (pageNum, onStart, onSuccess, onError) {
  var params = {
    pageNum: pageNum
  }
  proxy.postRequest(BASE_URL + '/user/parkBill', params, onStart, onSuccess, onError);
}

/**
 * 查找可以开票的订单
 */
const findInvoiceable = function (pageNumber, onStart, onSuccess, onError) {
  var params = {
    pageNumber: pageNumber
  }
  proxy.getRequest(BASE_URL + '/orders/my/invoiceable', params, onStart, onSuccess, onError);
}

/**
 * 未支付的停车卡账单
 */
const ticketOrderNoPay = function (pageNumber, onStart, onSuccess, onError) {
  var params = {
    pageNumber: pageNumber
  }
  proxy.getRequest(BASE_URL + '/orders/my/monthlyTkt/needToPay', params, onStart, onSuccess, onError);
}

/**
 * 已支付的停车卡账单
 */
const ticketOrderPaid = function (pageNumber, onStart, onSuccess, onError) {
  var params = {
    pageNumber: pageNumber
  }
  proxy.postRequest(BASE_URL + '/monthcard/getMonthCardList', params, onStart, onSuccess, onError);
}

/**
 * 退出停车场时生成的订单
 */
const needToPayOrder = function (onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/orders/my/parking/needToPay', params, onStart, onSuccess, onError);
}

/**
 * 退出停车场时生成的订单
 */
const needToPayByCar = function (carId, carNo, plateColor, onStart, onSuccess, onError) {
  var params = {
    carId: carId,
    carNo: carNo,
    plateColor: plateColor
  }
  proxy.postRequest(BASE_URL + '/orders/parking/needToPayByCar', params, onStart, onSuccess, onError);
}

/**
 * 根据订单和优惠券计算停车价格
 */
const inquery = function (orderId, couponId, onStart, onSuccess, onError) {
  var params = {
    orderId: orderId,
    couponId: couponId
  }
  proxy.postRequest(BASE_URL + '/orders/parking/inquery', params, onStart, onSuccess, onError);
}

/**
 * 进场图片
 */
const orderInImage = function (orderId, onStart, onSuccess, onError) {
  proxy.getRequest(BASE_URL + '/orders/image/in/' + orderId, {}, onStart, onSuccess, onError);
}

/**
 * 出场图片
 */
const orderOutImage = function (orderId, onStart, onSuccess, onError) {
  proxy.getRequest(BASE_URL + '/orders/image/out/' + orderId, {}, onStart, onSuccess, onError);
}

/**
 * 扫码进场
 */
const scanIn = function (deviceno, carno, onStart, onSuccess, onError) {
  var params = {
    deviceno: deviceno,
    carno: carno
  }
  proxy.postRequest(BASE_URL + '/user/scanIn', params, onStart, onSuccess, onError);
}

/**
 * 扫码出场
 */
const scanOut = function (deviceno, carno, onStart, onSuccess, onError) {
  var params = {
    deviceno: deviceno,
    carno: carno
  }
  proxy.postRequest(BASE_URL + '/user/scanPay', params, onStart, onSuccess, onError);
}

/**
 * 扫公众号出场
 */
const parkOut = function (parkid, carno, onStart, onSuccess, onError) {
  var params = {
    parkid: parkid,
    carno: carno
  }
  proxy.postRequest(BASE_URL + '/user/parkPay', params, onStart, onSuccess, onError);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:停车缴费相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:停车场相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 查询附近的租车位停车场
 */
const findNearParkings = function (lat, lng, distanceKm, onStart, onSuccess, onError) {
  var point = "point(" + lng + " " + lat + ")";
  var params = {
    centerPoint: point,
    distanceKm: distanceKm
  }
  proxy.postNoTokenRequest(BASE_URL + '/parks/nearby', params, onStart, onSuccess, onError);
}

/**
 * 查询停车场
 */
const findParkings = function (onStart, onSuccess, onError) {
  var params = {}
  proxy.postNoTokenRequest(BASE_URL + '/info/parklist', params, onStart, onSuccess, onError);
}

/**
 * 获取停车卡价格
 */
const fetchRentPrice = function (carId, parkId, startDate, endDate, placeType, onStart, onSuccess, onError) {
  var params = {
    carId: carId,
    endDate: endDate,
    parkId: parkId,
    startDate: startDate,
    placeType: placeType
  }
  proxy.postRequest(BASE_URL + '/orders/monthlyTkt/inquiry', params, onStart, onSuccess, onError);
}

/**
 * 获取停车场可用的停车位置（地上/地下）
 */
const groundType = function (parkId, onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/parks/placeType/' + parkId, params, onStart, onSuccess, onError);
}

/**
 * 支付月租停车卡
 */
const payRentPrice = function (parkid, carno1, carno2, stime, count, onStart, onSuccess, onError) {
  var params = {
    parkid: parkid,
    carno1: carno1,
    carno2: carno2,
    stime: stime,
    count: count
  }
  proxy.postRequest(BASE_URL + '/monthcard/buyMonthCard', params, onStart, onSuccess, onError);
}

/**
 * 购买月卡的记录
 */
const payRentRecord = function (pageNumber, onStart, onSuccess, onError) {
  var params = {
    pageNumber: pageNumber
  }
  proxy.getRequest(BASE_URL + '/monthcard/getMonthCardList', params, onStart, onSuccess, onError);
}

/**
 * 月卡规则
 */
const rentRule = function (parkid, onStart, onSuccess, onError) {
  var params = {
    parkid: parkid
  }
  proxy.postRequest(BASE_URL + '/monthcard/getMonthCardRule', params, onStart, onSuccess, onError);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:停车场相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:优惠券相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 领取优惠券
 */
const couponApply = function (id, onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/coupons/apply/' + id, params, onStart, onSuccess, onError);
}

/**
 * 激活优惠券
 */
const couponActive = function (id, amt, onStart, onSuccess, onError) {
  var params = {
    amt: amt,
    couponId: id
  }
  proxy.postRequest(BASE_URL + '/orders/coupon/active', params, onStart, onSuccess, onError);
}

/**
 * 根据优惠券状态查询优惠券
 */
const couponFind = function (status, pageNum, onStart, onSuccess, onError) {
  var params = {
    pageNumber: pageNum,
    status: status
  }
  proxy.getRequest(BASE_URL + '/coupons/find', params, onStart, onSuccess, onError);
}

/**
 * 查找订单可用用的优惠券
 */
const availableCoupons = function (orderId, onStart, onSuccess, onError) {
  var params = {}
  proxy.getRequest(BASE_URL + '/coupons/available?orderId=' + orderId, params, onStart, onSuccess, onError);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:优惠券相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:钱包相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 使用钱包支付停车费
 */
const payParkingFeeByWallet = function (deviceno, carno, onStart, onSuccess, onError) {
  var params = {
    deviceno: deviceno,
    carno: carno
  }
  proxy.postRequest(BASE_URL + '/user/comfirmPay', params, onStart, onSuccess, onError);
}

/**
 * 使用钱包缴费
 * @param {*} amt 金额
 * @param {*} couponId 优惠券 
 * @param {*} orderId 订单
 */
const payMonthCardByWallet = function (parkid, carno1, carno2, stime, count, onStart, onSuccess, onError) {
  var params = {
    parkid: parkid,
    carno1: carno1,
    carno2: carno2,
    stime: stime,
    count: count
  }
  proxy.postRequest(BASE_URL + '/monthcard/buyMonthCardBalance', params, onStart, onSuccess, onError);
}

/**
 * 微信支付
 */
const payMonthCardByWX = function (parkid, carno1, carno2, stime, count, onStart, onSuccess, onError) {
  var params = {
    parkid: parkid,
    carno1: carno1,
    carno2: carno2,
    stime: stime,
    count: count
  }
  proxy.postRequest(BASE_URL + '/monthcard/buyMonthCard', params, onStart, onSuccess, onError);
}

/**
 * 钱包充值
 * @param {*} amt 金额
 */
const charge = function (amt, onStart, onSuccess, onError) {
  var params = {
    amt: amt,
  }
  proxy.postRequest(BASE_URL + '/recharge/rechargeAmt', params, onStart, onSuccess, onError);
}

/**
 * 我的钱包
 * @param {*} amt 金额
 */
const wallet = function (onStart, onSuccess, onError) {
  proxy.getRequest(BASE_URL + '/orders/my/wallet', {}, onStart, onSuccess, onError);
}

/**
 * 充值记录
 * @param {*} onStart 
 * @param {*} onSuccess 
 * @param {*} onError 
 */
const walletHistory = function (pageNumber, onStart, onSuccess, onError) {
  var params = {
    // pageNumber: pageNumber
  }
  proxy.postRequest(BASE_URL + '/recharge/rechargeList', params, onStart, onSuccess, onError);
}

/**
 * 用户额外信息参数
 */
const userExpandInfo = function (onStart, onSuccess, onError) {
  var params = {}
  proxy.postRequest(BASE_URL + '/user/getUserinfo', params, onStart, onSuccess, onError);
}

/**
 * 快捷支付开关
 */
const quickPaySwitch = function (bool, onStart, onSuccess, onError) {
  var params = {
    isQuickPay: bool
  }
  proxy.getRequest(BASE_URL + '/users/my/setQuickPay', params, onStart, onSuccess, onError)
}

/**
 * 可充值的金额
 */
const chargeAmounts = function (onStart, onSuccess, onError) {
  proxy.postRequest(BASE_URL + '/recharge/rechargeConfig', {}, onStart, onSuccess, onError)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:钱包相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:充电桩相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 查看停车场充电桩详情
 */
const chargeDeviceList = function (parkingId, onStart, onSuccess, onError) {
  var params = {
    parkid: parkingId
  }
  proxy.postRequest(BASE_URL + "/info/getCdzListByParkid", params, onStart, onSuccess, onError)
}

/**
 * 充电桩详情
 */
const chargeDeviceDetail = function (deviceId, onStart, onSuccess, onError) {
  var params = {
    id: deviceId
  }
  proxy.postRequest(BASE_URL + "/info/cdzdeviceinfo", params, onStart, onSuccess, onError)
}

/**
 * 充电桩收费表
 */
const chargeFee = function (deviceId, onStart, onSuccess, onError) {
  var params = {
    id: deviceId
  }
  proxy.postRequest(BASE_URL + "/info/feestep", params, onStart, onSuccess, onError)
}

/**
 * 开始充电
 */
const chargeStart = function (id, carno, onStart, onSuccess, onError) {
  var params = {
    id: id,
    carno: carno
  }
  proxy.postRequest(BASE_URL + "/cdz/startCharge", params, onStart, onSuccess, onError)
}

/**
 * 结束充电
 */
const chargeEnd = function (id, payPark, onStart, onSuccess, onError) {
  var params = {
    id: id,
    payPark: payPark
  }
  proxy.postRequest(BASE_URL + "/cdz/stopChargeByUser", params, onStart, onSuccess, onError)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:充电桩相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:登录注册相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:登录注册相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:登录注册相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:登录注册相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:登录注册相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:登录注册相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================START:登录注册相关=======================================================================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//=========================================================END:登录注册相关========================================================================
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.wxlogin = wxlogin;
exports.isBindPhone = isBindPhone;
exports.bindPhone = bindPhone;
exports.getMessageCode = getMessageCode;
// exports.login = login;
exports.decryptPhone = decryptPhone;

exports.bindCarNo = bindCarNo;
exports.unbindCarNo = unbindCarNo;
exports.findBindCars = findBindCars;
exports.findCarPostion = findCarPostion;
exports.uploadCarCertif = uploadCarCertif;

exports.ticketOrderNoPay = ticketOrderNoPay;
exports.ticketOrderPaid = ticketOrderPaid;
exports.parkOrderNoPay = parkOrderNoPay;
exports.parkOrderPaid = parkOrderPaid;
exports.inquery = inquery;
exports.orderInImage = orderInImage;
exports.orderOutImage = orderOutImage;

exports.needToPayOrder = needToPayOrder;
exports.needToPayByCar = needToPayByCar;
exports.scanIn = scanIn;
exports.scanOut = scanOut;
exports.parkOut = parkOut;

exports.findInvoiceable = findInvoiceable;

exports.findParkings = findParkings;
exports.findNearParkings = findNearParkings;

exports.fetchRentPrice = fetchRentPrice;
exports.groundType = groundType;
exports.payRentPrice = payRentPrice;
exports.payRentRecord = payRentRecord;
exports.rentRule = rentRule

exports.couponApply = couponApply;
exports.couponActive = couponActive;
exports.couponFind = couponFind;
exports.availableCoupons = availableCoupons;

exports.payParkingFeeByWallet = payParkingFeeByWallet
exports.payMonthCardByWallet = payMonthCardByWallet;
exports.payMonthCardByWX = payMonthCardByWX;
exports.charge = charge;
exports.wallet = wallet;
exports.walletHistory = walletHistory;
exports.userExpandInfo = userExpandInfo;
exports.quickPaySwitch = quickPaySwitch;
exports.chargeAmounts = chargeAmounts;

exports.chargeDeviceList = chargeDeviceList;
exports.chargeDeviceDetail = chargeDeviceDetail;
exports.chargeFee = chargeFee;
exports.chargeStart = chargeStart;
exports.chargeEnd = chargeEnd