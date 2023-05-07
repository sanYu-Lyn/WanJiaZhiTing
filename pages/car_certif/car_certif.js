// pages/car_certification/car_certification.js
import http from '../../http/http_do'
import toast from '../../utils/utils_toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, // 0默认 1手动输入
    car: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var car = JSON.parse(options.car);
    this.setData({
      car: car
    })
  },

  onInputClick: function () {
    this.setData({
      type: 1
    })
  },

  onCameraClick: function () {
    var car = this.data.car;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        if (res.tempFilePaths[0] && car) {
          http.uploadCarCertif(res.tempFilePaths[0], car.carId, 'licenseImg',
            () => {
              wx.showLoading()
            },
            res => {
              wx.navigateBack()
              wx.hideLoading()
            },
            res => {
              wx.hideLoading()
            })
        }
      },
      fail(res) {
        toast.normal(res.errMsg);
      }
    })
  },

  onCertifClick: function (e) {

  }
})