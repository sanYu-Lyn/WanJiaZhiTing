// pages/detail/detail.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parking: null,
    lat: getApp().globalData.latitude,
    lng: getApp().globalData.longitude,
    parkLat: 0,
    parkLng: 0,
    makers: [],
    monthCard: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var parking = JSON.parse(options.parking);
    this.setData({
      parking: parking,
      parkLat: parking.wd,
      parkLng: parking.jd,
      lat: getApp().globalData.latitude,
      lng: getApp().globalData.longitude,
      makers: this.createpParkingMaker(parking)
    })
    this.parkingRule()
  },

  parkingRule: function () {
    http.rentRule(this.data.parking.id, () => {}, res => {
      this.setData({
        monthCard: res.data
      })
    }, res => {})
  },

  jumpApply: function () {
    // if (this.data.parking.availableGroundMonthlyCnt > 0 || this.data.parking.availableUndergroundMonthlyCnt > 0) {
    wx.navigateTo({
      url: '../rent_apply/rent_apply?parking=' + JSON.stringify(this.data.parking) +
        '&card=' + JSON.stringify(this.data.monthCard),
    })
    // }
  },

  /**
   * 创建停车位标注
   */
  createpParkingMaker: function (parking) {
    return [{
      'id': 1,
      'longitude': parking.jd,
      'latitude': parking.wd,
      'title': parking.parkname,
      'width': 30,
      'height': 34,
      'iconPath': '../../image/ic_map_parking.png',
      //'callout': this.createCallout(),
    }];
  },

  onShowOnMapClick: function () {
    // var parking = this.data.parking
    // var map = wx.createMapContext('rent_map')
    // map.moveToLocation({
    //   'latitude': parking.lat,
    //   'longitude': parking.lng,
    // });
    wx.navigateBack()
  },

  goTo: function (e) {
    var parking = this.data.parking
    wx.openLocation({
      latitude: parking.wd,
      longitude: parking.jd
    })
  },

  onDeviceTap: function (e) {
    console.log(this.data.parking)
    let p = JSON.stringify(this.data.parking)
   
    wx.navigateTo({
      url: '../charge_list/charge_list?parking=' + p,
    })
  }
})