import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parking: null,
    ls: null,
    device: null,
    devices: null,
    balance: null,
    amt: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      parking: JSON.parse(options.parking),
    })
  },

  onShow() {
    this.requestDevice()
    this.requestCurrent()
  },

  requestDevice() {
    http.chargeMoto(this.data.parking.id,
      () => {},
      res => this.setData({
        devices: res.data
      }), res => {})
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

  requestCurrent: function () {
    http.chargeCurrentMoto(
      () => {},
      res => {
        this.setData({
          ls: res.data.ls,
          device: res.data.deviceinfo
        })
      },
      res => {}
    )
  },

  onDeviceTap(e) {
    var device = this.data.devices[e.currentTarget.dataset.index]
    if (device.status == 0) {
      wx.navigateTo({
        url: '../charge_start/charge_start?device=' + JSON.stringify(device) + '&moto=true',
      })
    } else if (this.data.ls && this.data.ls.parkid == this.data.parking.id &&
      this.data.ls.deviceid == device.id) {
      this.data.ls.isMoto = true
      wx.navigateTo({
        url: '../charge_pay/charge_pay?ls=' + JSON.stringify(this.data.ls) +
          '&device=' + JSON.stringify(this.data.device),
      })
    }
  },
})