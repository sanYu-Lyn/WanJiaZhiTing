import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ls: null,
    device: null,
    balance: null,
    cdzls: null,
    parkls: null,
    amt: null,
    payPark: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      ls: JSON.parse(options.ls),
      // device: JSON.parse(options.device)
    })

    if (options.device) {
      this.setData({
        device: JSON.parse(options.device)
      })
    } else {
      this.requestDevice()
    }
  },

  requestDevice() {
    if (this.data.ls.isMoto) {
      http.chargeMotoDeviceDetail(this.data.ls.deviceid,
        () => {},
        res => this.setData({
          device: res.data
        }), res => {})
    } else {
      http.chargeDeviceDetail(this.data.ls.deviceid,
        () => {},
        res => this.setData({
          device: res.data
        }), res => {})
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

  onChargeEnd: function () {
    if (this.data.ls.isMoto) {
      this.stopMotoCharge()
    } else {
      this.stopCarCharge()
    }
  },

  onParkClick: function (params) {
    var _amt = this.data.cdzls.amt
    _amt += this.data.parkls ? this.data.parkls.amt : 0
    this.setData({
      payPark: !this.data.payPark,
      amt: _amt
    })
  },

  onPayClick: function () {
    if (this.data.ls.isMoto) {
      this.payMotoCharge()
    } else {
      this.payCarCharge()
    }
  },

  stopCarCharge() {
    http.chargeEnd(this.data.ls.id,
      () => {},
      res => {
        this.setData({
          balance: res.data.balance,
          cdzls: res.data.cdzls,
          parkls: res.data.parkls,
          amt: res.data.cdzls.amt
        })

        var _amt = this.data.amt + this.data.parkls ? this.data.parkls.amt : 0
        //当用户余额不够一起支付两个的时候，前端不需要用户选择是否一起支付
        if (_amt > this.data.balance) {
          this.setData({
            parkls: null
          })
        }
      },
      res => {}
    )
  },

  stopMotoCharge() {
    http.chargeMotoEnd(this.data.ls.id,
      () => {},
      res => {
        this.setData({
          balance: 10000,
          cdzls: res.data.ls,
          amt: res.data.ls.amt
        })
      },
      res => {}
    )
  },

  payCarCharge() {
    http.chargePay(this.data.cdzls.id, this.data.payPark ? 1 : 0,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })
      },
      res => {})
  },

  payMotoCharge() {
    http.chargePayMoto(this.data.cdzls.id,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })
      },
      res => {})
  },
})