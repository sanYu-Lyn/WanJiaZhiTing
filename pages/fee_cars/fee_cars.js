// pages/fee_cars/fee_cars.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'
import util from '../../utils/utils_tool'
import toast from '../../utils/utils_toast'
import pay from '../../utils/utils_pay'

Page({

  data: {
    cars: [],
    chooseIndex: 0,
    to: 'out'
  },

  onLoad(options) {
    const _to = options.to
    this.setData({
      to: _to
    })
  },

  onShow: function () {
    this.requestCars();
  },

  requestCars: function () {
    http.findBindCars(() => {
        var cars = persistence.getCarLicenses();
        this.setData({
          cars: cars
        })
      },
      res => {
        persistence.setCarLicense(res.data)
        this.setData({
          cars: res.data
        })
      },
      res => {})
  },

  onItemClick: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chooseIndex: index
    })
  },

  jumpBindCar: function () {
    var params = util.generateTarget(1);
    wx.navigateTo({
      url: '../car_bind/car_bind?target=' + JSON.stringify(params),
    })
  },

  submit: function () {
    if (this.data.to == 'in') {
      this.scanIn()
    } else {
      this.scanOut()
    }
  },

  scanOut: function () {
    var car = this.data.cars[this.data.chooseIndex]
    pay.pay_out('1', car.carno, 1,
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })
      },
      res => wx.hideLoading()
    )
  },

  scanIn: function () {
    var car = this.data.cars[this.data.chooseIndex]
    http.scanIn('d1', '桂A888888',
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        wx.reLaunch({
          url: '../base_result/base_result?src=7',
        })
      },
      res => wx.hideLoading())
  }
})