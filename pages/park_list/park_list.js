import http from '../../http/http_do'
import authorize from '../../utils/utils_authorize'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkings: null,
    navigationBarHeight: (getApp().globalData.statusBarHeight + 40) + 'px'
  },

  onReady: function () {
    this.requestLocation(
      (lat, lng) => {
        //更新用户的位置信息
        getApp().globalData.latitude = lat
        getApp().globalData.longitude = lng

        this.findParkings();
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  findParkings: function () {
    http.findParkings(
      () => {},
      res => {
        this.setData({
          parkings: res.data
        })
      },
      res => {}
    )
  },

  requestLocation: function (callback) {
    authorize.open(
      'scope.userLocation',
      function () {
        wx.getLocation({
          type: 'gcj02',
          isHighAccuracy: true,
          success: function (res) {
            callback(res.latitude, res.longitude)
          },
          fail: function (res) {
            console.log('Get location failed : ' + res.errMsg)
          }
        })
      },
      function (res) {})
  },

  jumpParkingDetail: function (e) {
    var parking = this.data.parkings[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../rent_detail/rent_detail?parking=' + JSON.stringify(parking),
    })
  },

  locateTo: function (e) {
    var parking = this.data.parkings[e.currentTarget.dataset.index]
    wx.openLocation({
      latitude: parking.wd,
      longitude: parking.jd
    })
  }
})