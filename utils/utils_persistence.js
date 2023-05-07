/**
 * 保存用户输入的车牌号
 * @param {*} value 车牌号
 */
const setCarLicense = function (value) {
  wx.setStorageSync('car_licenses', value)
}

/**
 * 获取用户输入的车牌号
 * @param {*} value 车牌号
 */
const getCarLicenses = function () {
  return wx.getStorageSync("car_licenses") || [];
}

const addInvoiceTitle = function (type, name, num, def, address, phone, bank_addr, bank_account, mobile, email) {
  var arr = getInvoiceTitles();
  let data = {
    type: type,
    name: name,
    num: num,
    def: def,
    address: address,
    phone: phone,
    bank_addr: bank_addr,
    bank_account: bank_account,
    mobile: mobile,
    email: email
  };
  arr.unshift(data);
  wx.setStorageSync('invoice_titles', arr)
}

const removeInvoiceTitle = function (index) {
  var arr = getInvoiceTitles();
  if (index < arr.length) {
    arr.splice(index, 1);
    wx.setStorageSync('invoice_titles', arr)
  }
}

const getInvoiceTitles = function () {
  return wx.getStorageSync("invoice_titles") || [];
}

const modifyInvoiceTitles = function (title) {
  var arr = getInvoiceTitles();
  if (title.index < arr.length) {
    arr[title.index] = title;
    wx.setStorageSync('invoice_titles', arr)
  }
}

const addUser = function (user) {
  wx.setStorageSync('login_user', user)
}

const removeUser = function () {
  wx.removeStorageSync('login_user')
}

const getUser = function () {
  return wx.getStorageSync("login_user")
}

const setPaySettings = function (b) {
  wx.setStorageSync('pay_setting_auto', b)
}

const getPaySettings = function () {
  return wx.getStorageSync('pay_setting_auto')
}

const clear = function () {
  wx.removeStorageSync('car_licenses')
  wx.removeStorageSync('login_user')
  wx.removeStorageSync('pay_setting_auto')
  wx.removeStorageSync('invoice_titles')
}

exports.setCarLicense = setCarLicense;
exports.getCarLicenses = getCarLicenses;
exports.addInvoiceTitle = addInvoiceTitle;
exports.removeInvoiceTitle = removeInvoiceTitle;
exports.getInvoiceTitles = getInvoiceTitles;
exports.modifyInvoiceTitles = modifyInvoiceTitles;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.getUser = getUser;
exports.setPaySettings = setPaySettings;
exports.getPaySettings = getPaySettings;
exports.clear = clear