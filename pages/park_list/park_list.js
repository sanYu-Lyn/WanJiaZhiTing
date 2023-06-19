import http from '../../http/http_do'
import authorize from '../../utils/utils_authorize'

var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Component({

  lifetimes: {

    ready() {
      qqmapsdk = new QQMapWX({
        key: 'D3NBZ-47EWW-KQ2RW-3O2DL-RU4RT-DQFKT'
      });

      this.requestLocation(
        (lat, lng) => {
          //更新用户的位置信息
          getApp().globalData.latitude = lat
          getApp().globalData.longitude = lng

          this.findParkings();

          this.requestCity()
        }
      )
    },
  },

  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },

  data: {
    parkings: null,
    navigationBarHeight: (getApp().globalData.statusBarHeight + 40) + 'px',
    city: '定位中',
    count: 0
  },

  methods: {
    findParkings: function () {
      http.findParkings(
        getApp().globalData.longitude,
        getApp().globalData.latitude,
        "",
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
    },

    requestCity() {
      var that = this
      qqmapsdk.reverseGeocoder({
        success: function (res) { //成功后的回调
          console.log(res);
          that.setData({
            city: res.result.address_component.city
          })
        }
      })
    }
  },
})