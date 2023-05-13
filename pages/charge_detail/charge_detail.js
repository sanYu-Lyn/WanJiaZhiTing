// pages/charge_detail/charge_detail.js

import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      device: JSON.parse(options.device)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.requestDetail()
  },

  requestDetail: function () {
    http.chargeDeviceDetail(
      this.data.device.id,
      () => wx.showLoading(),
      res => {
        this.setData({
          devices: res.data
        })
        wx.hideLoading()
      },
      res => wx.hideLoading()
    )
  }
})