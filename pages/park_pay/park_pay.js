// pages/park_pay/park_pay.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'
import toast from '../../utils/utils_toast'

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      console.log('user---->' + getApp().globalData.userInfo)
      if (getApp().globalData.userInfo) {
        this.findBindCars();
      } else {
        console.log('jump---->' + this.data.autoJump)
        if (this.data.autoJump) {
          this.setData({
            autoJump: false
          })
          wx.navigateTo({
            url: '../base_login/base_login',
          })
        } else {
          wx.switchTab({
            url: '/pages/me_center/me_center'
          })
          this.setData({
            autoJump: true
          })
        }
      }
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    autoJump: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShareAppMessage: function () {

    },

    onShareTimeline: function () {

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
      wx.navigateTo({
        url: '../car_bind/car_bind?target=' + JSON.stringify(params),
      })
    },

    submit: function () {
      var car = this.data.cars[this.data.chooseIndex]
      console.log('carno = %s id = %s', car.carno, this.data.id)
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
  }
})