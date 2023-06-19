// pages/fee_cars/fee_cars.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'
import pay from '../../utils/utils_pay'
import toast from '../../utils/utils_toast'

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
    http.parkOut(car.carno,
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        const order = {
          lsid: res.data.lsid,
          amt: res.data.amt,
          cardno: res.data.carno,
          intime: res.data.intime,
          parktime: res.data.parktime,
          parkName: res.data.parkname,
          parkid: res.data.parkid,
          status: 'needToPay'
        }
        wx.navigateTo({
          url: '../fee_pay/fee_pay?order=' + JSON.stringify(order),
        })
      },
      res => {
        wx.hideLoading()
        toast.normal('未查询到停车订单');
        setTimeout(() => {
          wx.navigateTo({
            url: '../fee_bill/fee_bill',
          })
        }, 2000);
      }
    )
  },

  scanIn: function () {
    var car = this.data.cars[this.data.chooseIndex]
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