import http from '../../http/http_do'
import toast from '../../utils/utils_toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    hours: [-1, 2, 4, 6, 8, 9],
    hour: -1,
    amt: null,
    car: null,
    isMoto: false
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
  },

  onShow: function () {
    this.requestWallet()
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
    if (this.data.isMoto) {
      this.doMotoCharge()
    } else {
      this.doCarCharge()
    }
  },

  doCarCharge() {
    const carno = this.data.car == null ? "" : this.data.car.carno
    http.chargeStart(this.data.device.id, carno, this.data.hour == -1 ? 0 : this.data.hour * 60,
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
    http.chargeMotoStart(this.data.device.id, carno, this.data.hour == -1 ? 0 : this.data.hour * 60,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  }
})