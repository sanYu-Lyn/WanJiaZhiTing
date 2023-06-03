// pages/fee_cars/fee_cars.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'
import pay from '../../utils/utils_pay'

Page({

  data: {
    cars: [],
    chooseIndex: 0,
    to: 'out',
    id: null
  },

  onLoad(options) {
    this.setData({
      to: options.to,
      id: options.id
    })
  },

  onShow: function () {
    this.findBindCars();
  },

  findBindCars: function () {
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
    var params = {
      to: 'bind_to_pay'
    }
    if (this.data.to == 'in') {
      params.to = 'bind_to_in'
    } else if (this.data.to == 'charge') {
      params.to = 'bind_to_charge'
    }
    wx.navigateTo({
      url: '../car_bind/car_bind?target=' + JSON.stringify(params),
    })
  },

  submit: function () {
    if (this.data.to == 'charge') {
      const pages = getCurrentPages()
      const prePage = pages[pages.length - 2]
      prePage.setData({
        car: this.data.cars[this.data.chooseIndex]
      })
      wx.navigateBack()
    } else if (this.data.to == 'in') {
      this.scanIn()
    } else if (this.data.to == 'parkout') {
      this.scanOut()
    }
  },

  scanOut: function () {
    var car = this.data.cars[this.data.chooseIndex]
    console.log('carno = %s id = %s', car.carno, this.data.id)
    pay.pay_out(this.data.id, car.carno, 1,
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
    console.log('carno = %s id = %s', car.carno, this.data.id)
    http.scanIn(this.data.id, car.carno,
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