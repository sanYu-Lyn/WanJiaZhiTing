import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ls: null,
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
      ls: JSON.parse(options.ls)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.requestDetail()
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
    http.chargeStart(this.data.device.id, '桂A888888',
      () => {},
      res => {},
      res => {}
    )
  },

  onChargeEnd: function (params) {
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

  onParkClick: function (params) {
    var _amt = this.data.cdzls.amt
    _amt += this.data.parkls ? this.data.parkls.amt : 0
    this.setData({
      payPark: !this.data.payPark,
      amt: _amt
    })
  },

  onPayClick: function (params) {
    http.chargePay(this.data.cdzls.id, this.data.payPark ? 1 : 0,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })
      },
      res => {})
  }

})