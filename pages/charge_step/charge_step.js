import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    fee: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      device: JSON.parse(options.device)
    })
    console.log(this.data.device)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.requestDetail()
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
})