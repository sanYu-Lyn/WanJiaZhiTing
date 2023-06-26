// pages/charge_list.js
import http from '../../http/http_do'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    parking: '',
    devices: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      parking: JSON.parse(options.parking)
    })

    this.reuquestChargeDeviceList()
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  reuquestChargeDeviceList: function () {
    http.chargeDeviceList(this.data.parking.id,
      () => wx.showLoading(),
      res => {
        this.setData({
          devices: res.data
        })
        wx.hideLoading()
      },
      res => wx.hideLoading()
    )
  },

  jumpChargeDeviceDetail: function (e) {
    var device = this.data.devices[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../charge_step/charge_step?device=' + JSON.stringify(device),
    })
  }
})