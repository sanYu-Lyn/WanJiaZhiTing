import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    fee: null,
    canStop: false,
    ls: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _device = JSON.parse(options.device)
    this.setData({
      device: _device,
      status: _device.status
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow() {
    this.requestDetail()
    if (getApp().globalData.userInfo) {
      this.requestUserCharge()
    }
  },

  requestDetail: function () {
    http.chargeFee(
      this.data.device.id,
      () => wx.showLoading(),
      res => {
        this.setData({
          fee: res.data
        })
        wx.hideLoading()
      },
      res => wx.hideLoading()
    )
  },

  requestUserCharge() {
    http.chargeCurrent(
      () => {},
      res => {
        this.setData({
          canStop: this.data.device.id == res.data.deviceinfo.id,
          ls: res.data.ls,
        })
      },
      res => {}
    )
  },

  onChargeStart: function (params) {
    if (getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../charge_start/charge_start?device=' + JSON.stringify(this.data.device),
      })
    } else {
      wx.navigateTo({
        url: '../base_login/base_login',
      })
    }
  },

  onChargeEnd() {
    wx.navigateTo({
      url: '../charge_pay/charge_pay?ls=' + JSON.stringify(this.data.ls) +
        '&device=' + JSON.stringify(this.data.device),
    })
  }
})