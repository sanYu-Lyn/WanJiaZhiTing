import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parking: null,
    ls: null,
    device: null,
    scokets: null,
    fee: [],
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

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  requestDevice() {
    http.parkingSockets(this.data.parking.id,
      () => {},
      res => {
        var feeDisplay = []
        for (var i in res.data.feeconfig) {
          var title = (res.data.feeconfig[i].s + '~' + res.data.feeconfig[i].e + '瓦')
          var price = res.data.feeconfig[i].price + '元/小时'
          feeDisplay.push({
            title: title,
            price: price
          })
        }
        this.setData({
          sockets: res.data.list,
          device: res.data.device,
          fee: feeDisplay
        })
      }, res => {})
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
    var socket = this.data.sockets[e.currentTarget.dataset.index]
    if (socket.status == 0) {
      wx.navigateTo({
        url: '../charge_start/charge_start?' +
          'device=' + JSON.stringify(this.data.device) +
          '&socket=' + JSON.stringify(socket) +
          '&moto=true',
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