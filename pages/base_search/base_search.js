// search/search.js

import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'parkings': [],
    'key': '',
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  /**
   * 监听用户的输入内容，进项推荐查询
   * @param {输入内容} e 
   */
  bindUserInput: function (e) {
    if (e.detail.value.length == 0) {
      this.setData({
        'result': [],
        'key': ''
      })
    } else {
      this.setData({
        'key': e.detail.value
      })
      this.searchByKey(e.detail.value)
    }
  },

  navigate_to: function (e) {
    let index = e.currentTarget.dataset.index;
    let item = this.data.result[index];
    wx.openLocation({
      latitude: item.location.lat,
      longitude: item.location.lng,
      name: item.title,
      address: item.address,
    })
  },

  /**
   * 根据关键词搜索
   * https://developers.weixin.qq.com/community/servicemarket/detail/000c86744f0258bddd99ab93051c15
   */
  searchByKey: async function (key) {
    // var that = this;
    // poi.searchByKey(key, getApp().globalData.city, function (res) {
    //   that.setData({
    //     'result': res
    //   })
    // }, function (res) {})
    if (key.length > 0) {
      http.findParkings(
        getApp().globalData.longitude,
        getApp().globalData.latitude,
        key,
        () => {},
        res => {
          this.setData({
            parkings: res.data
          })
        },
        res => {}
      )
    } else {
      this.setData({
        parkings: []
      })
    }
  },

  bindUserInput: function (eventhandle) {
    this.searchByKey(eventhandle.detail.value)
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