import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkings: null,
    navigationBarHeight: (getApp().globalData.statusBarHeight + 40) + 'px'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findParkings();
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