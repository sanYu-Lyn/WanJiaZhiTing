import http from '../../http/http_do'
import toast from '../../utils/utils_toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    hours: [-1, 2, 4, 6, 8, 9],
    sockets: [],
    hour: -1,
    amt: null,
    car: null,
    isMoto: false,
    curSocket: null,
    showSpinner: false
  },

  onLoad: function (options) {
    this.setData({
      device: JSON.parse(options.device)
    })

    if (options.moto) {
      this.setData({
        isMoto: true
      })
    }

    if (options.socket) {
      console.log('---------------------->' + options.socket)
      this.setData({
        curSocket: {
          socket: options.socket
        }
      })
    }
  },

  onShow: function () {
    this.requestWallet()
    this.requestSocket()
  },

  onHourClick: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      hour: this.data.hours[index]
    })
  },

  onPayClick() {
    wx.navigateTo({
      url: '../me_wallet/me_wallet?to=charge',
    })
  },

  requestWallet() {
    http.userExpandInfo(
      () => {},
      res => {
        this.setData({
          amt: res.data.amt
        })
      },
      res => {}
    )
  },

  requestSocket() {
    http.deviceSockets(
      this.data.device.deviceno,
      () => {},
      res => {
        this.setData({
          sockets: res.data,
        })
      },
      res => {}
    )
  },

  onBindClick() {
    wx.navigateTo({
      url: '../fee_cars/fee_cars?to=charge',
    })
  },

  onCancelClick() {
    this.setData({
      car: null
    })
  },

  onChargeClick: function (e) {
    if (this.data.curSocket == null) {
      toast.normal('请选择您要充电的插座')
      return
    }
    if (this.data.isMoto) {
      this.doMotoCharge()
    } else {
      this.doCarCharge()
    }
  },

  doCarCharge() {
    const carno = this.data.car == null ? "" : this.data.car.carno
    http.chargeStart(
      this.data.device.id,
      carno,
      this.data.hour == -1 ? 0 : this.data.hour * 60,
      this.data.curSocket.socket,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  },

  doMotoCharge() {
    const carno = this.data.car == null ? "" : this.data.car.carno
    http.chargeMotoStart(
      this.data.device.id,
      carno,
      this.data.hour == -1 ? 0 : this.data.hour * 60,
      this.data.curSocket.socket,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  },

  onSocketTap(e) {
    this.setData({
      showSpinner: true
    })
  },

  onSocketItemTap(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      curSocket: this.data.sockets[index]
    })
  },

  onOutsideTap(e) {
    this.setData({
      showSpinner: false
    })
  }
})