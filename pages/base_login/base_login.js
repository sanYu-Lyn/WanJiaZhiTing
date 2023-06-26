// pages/base_login/base_login.js
import login from '../../utils/utils_login'
import utils from '../../utils/utils_tool'
import toast from '../../utils/utils_toast'
import http from '../../http/http_do'
import scan from '../../utils/utils_qrcode'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    phone: null,
    code: null,
    status: 0, //0 初始界面 1弹窗界面 2绑定手机界面 
    countDown: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.countDown);
    if (getApp().globalData.userInfo != null && !getApp().globalData.userInfo.isBinded) {
      login.logOut()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  onPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  onCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  onGetCodeClick: function () {
    if (this.data.time < 60) {
      return
    }

    if (!utils.checkPhone(this.data.phone)) {
      toast.normal('手机号码不合法')
      return
    }

    http.getMessageCode(this.data.phone, () => {}, () => {}, () => {})

    this.setData({
      countDown: setInterval(() => {
        if (this.data.time == 0) {
          this.setData({
            time: 60,
          })
          clearInterval(this.data.countDown);
        } else {
          this.data.time--;
          this.setData({
            time: this.data.time,
          })
        }
      }, 1000)
    })
  },

  onPhoneLoginClick: function () {
    login.bindPhone(this.data.phone, this.data.code,
      () => {
        wx.showLoading()
      },
      res => {
        scan.doTask()
      },
      res => {
        wx.hideLoading()
      })
  },

  onWXLoginClick: function (e) {
    var user = e.detail.userInfo
    var rawData = e.detail.rawData
    var signature = e.detail.signature
    var encryptedData = e.detail.encryptedData
    var iv = e.detail.iv

    login.login(user, rawData, signature, encryptedData, iv,
      () => {
        wx.showLoading()
      },
      res => {
        wx.navigateBack()
        wx.hideLoading()
      },
      res => {
        wx.hideLoading()
      })
  },

  onBindPhoneClick: function (e) {
    http.decryptPhone(e.detail.encryptedData, e.detail.iv, getApp().globalData.userInfo.sessionKey,
      () => {},
      res => {
        scan.doTask()
        // this.setData({
        //   phone: res.data.purePhoneNumber,
        //   status: 2
        // })
        // this.onGetCodeClick()
      },
      res => {})
  },

  onCloseClick: function () {
    login.logOut()
    this.setData({
      status: 0
    })
  },

  onUserAgreementClick: function () {
    wx.navigateTo({
      url: '../base_notice/base_notice?src=3',
    })
  },

  onPrivacyAgreementClick: function () {
    wx.navigateTo({
      url: '../base_notice/base_notice?src=4',
    })
  }
})