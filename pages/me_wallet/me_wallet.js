// pages/me_wallet/me_wallet.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userExpandInfo: null,
    content: "",
    current: -1,
    to: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestChargeAmounts();
    if (options.to != null) {
      this.setData({
        to: options.to
      })
    }
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
    this.requestMoney();
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  onHistoryClick: function () {
    wx.navigateTo({
      url: '../wallet_history/wallet_history',
    })
  },

  onSettingsClick: function () {
    wx.navigateTo({
      url: '../wallet_settings/wallet_settings',
    })
  },

  onChargeClick: function () {
    if (this.data.content && this.data.current > 0) {
      const that = this
      var amount = Object.keys(this.data.content)[this.data.current - 1]
      http.charge(amount,
        () => {},
        res => {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.packageValue,
            signType: res.data.signType,
            paySign: res.data.paySign,
            success(res) {
              console.log('------------------------------>')
              if (that.data.to == 'charge') {
                wx.redirectTo({
                  url: '../base_result/base_result?src=5',
                })
              } else {
                wx.navigateTo({
                  url: '../base_result/base_result?src=5',
                })
              }
            },
            fail(res) {}
          })
        },
        res => {}
      )
    }
  },

  requestMoney: function () {
    http.userExpandInfo(
      () => {},
      res => {
        this.setData({
          userExpandInfo: res.data
        })
      },
      res => {}
    )
  },

  requestChargeAmounts: function () {
    http.chargeAmounts(
      () => {},
      res => {
        this.setData({
          content: res.data
        })
      },
      res => {}
    )
  },

  onPriceClick: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      current: index
    })
  }
})