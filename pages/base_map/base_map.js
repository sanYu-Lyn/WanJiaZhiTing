// pages/map/map.js
import http from '../../http/http_do'
import authorize from '../../utils/utils_authorize'
import poi from '../../utils/utils_map'
import util from '../../utils/utils_tool'

Page({

  data: {
    data: [],
    maker: [],
    currentIndex: 0,
    scale: 3,
    requestLat: 0,
    requestLng: 0,
    firstRenader: true
  },

  onReady: function () {
    this.onLaunch(this.data.scale);
  },

  /**
   * 定位到用户的当前位置
   */
  locate: function () {
    var map = wx.createMapContext('map')
    map.moveToLocation()
  },

  createMarkers: function (parkings) {
    if (parkings && parkings.length > 0) {
      var parkingMakers = [];
      for (var i = 0; i < parkings.length; i++) {
        var parking = parkings[i];
        parking.index = i
        if (util.isEmpty(parking.contact)) {
          parking.contact = '暂无数据'
        }
        parking.canRent = parking.parkId && parking.hasPubMonthlyTkt &&
          (parking.hasGroundPlace || parking.hasUndergroundPlace)
        if (parking.parkId) {
          parkingMakers.push(this.createRentMaker(parking));
        } else {
          parkingMakers.push(this.createParkingMaker(parking));
        }
      }
      this.setData({
        data: parkings,
        makers: parkingMakers
      });
    }
  },

  /**
   * 创建地图本身的位置的标注
   */
  createParkingMaker: function (parking) {
    return {
      'id': parking.index,
      'longitude': parking.lng,
      'latitude': parking.lat,
      'title': parking.name,
      'width': parking.index == this.data.currentIndex ? 50 : 30,
      'height': parking.index == this.data.currentIndex ? 58 : 34,
      'iconPath': '../../image/ic_map_parking.png',
      'callout': this.createCallout(parking),
      'zIndex': -1
    };
  },

  /**
   * 创建有合作的位置的标注
   */
  createRentMaker: function (parking) {
    return {
      'id': parking.index,
      'longitude': parking.lng,
      'latitude': parking.lat,
      'title': parking.name,
      'width': parking.index == this.data.currentIndex ? 50 : 30,
      'height': parking.index == this.data.currentIndex ? 58 : 34,
      'iconPath': '../../image/ic_map_rent.png',
      'callout': this.createCallout(parking),
      'zIndex': -1
    };
  },

  /**
   * 创建气泡
   */
  createCallout: function (parking) {
    return {
      content: parking.name,
      color: '#fff',
      fontSize: 14,
      bgColor: '#6EC7FF',
      borderRadius: 30,
      borderColor: '#6EC7FF',
      padding: 4,
      borderWidth: 10,
      display: parking.index == this.data.currentIndex ? 'ALWAYS' : 'BYCLICK'
    }
  },

  /**
   * 跳转搜索界面
   */
  jumpSearch: function () {
    wx.navigateTo({
      url: '../base_search/base_search',
    })
  },

  /**
   * 查看详情
   */
  jumpDetail: function (e) {
    if (getApp().globalData.userInfo) {
      var parking = this.data.data[e.currentTarget.dataset.index]
      wx.navigateTo({
        url: '../rent_detail/rent_detail?parking=' + JSON.stringify(parking),
      })
    } else {
      wx.navigateTo({
        url: '../base_login/base_login',
      })
    }
  },

  /**
   * 导航
   */
  goTo: function (e) {
    var parking = this.data.data[e.currentTarget.dataset.index]
    wx.openLocation({
      latitude: parking.lat,
      longitude: parking.lng,
      name: parking.name,
      address: parking.address,
    })
  },

  /**
   * 视野发生变化
   */
  bindregionchange: function (e) {
    var self = this
    var map = wx.createMapContext('map')
    map.getScale({
      success: function (res) {
        var s = util.getScale(res.scale)
        self.findParking(s)
      }
    })
  },

  /**
   * 点击maker
   */
  bindmarkertap: function (e) {
    var index = e.markerId;
    this.setData({
      currentIndex: index
    })
  },

  onRendered: function () {
    if (this.data.firstRenader) {
      //首次渲染结束，立即查询附近的停车场
      this.findParking(this.data.scale)
      this.setData({
        firstRenader: false
      })
    }
  },

  /**
   * 视野发生变化
   */
  onItemChanged: function (e) {
    var index = e.detail.current;
    // var parking = this.data.data[index];
    // var map = wx.createMapContext('map')
    // map.moveToLocation({
    //   'latitude': parking.lat,
    //   'longitude': parking.lng,
    // });
    this.setData({
      currentIndex: index
    })
    this.createMarkers(this.data.data)
  },

  /**
   * 启动应用
   */
  onLaunch: function () {
    var self = this
    this.requestLocation(
      (lat, lng) => {
        //定位当前位置
        setTimeout(function () {
          self.locate();
        }, 300)

        //更新用户的位置信息
        getApp().globalData.latitude = lat
        getApp().globalData.longitude = lng
        this.setData({
          'lat': lat,
          'lng': lng
        })

        //更新用户所处的城市信息
        poi.searchByLocaton(lat, lng,
          res => {
            getApp().globalData.city = res.data.result.address_component.city
            getApp().globalData.province = res.data.result.address_component.province
          },
          res => {})
      }
    )
  },

  /**
   * 查询地图中心点附近的停车场
   */
  findParking: function (scale) {
    var self = this
    var map = wx.createMapContext('map')
    map.getCenterLocation({
      success(res) {
        var difLat = self.data.requestLat - res.latitude
        var difLng = self.data.requestLng - res.longitude;

        if (Math.abs(difLat) < 0.003 && Math.abs(difLng) < 0.003) {
          return
        }

        //根据用户的位置查询附近的停车场
        // http.findParkings(res.latitude, res.longitude, scale,
        //   // http.findParkings('24.288651', '109.394974', 5,
        //   () => {},
        //   res => {
        //     var parkings = res.data;
        //     self.createMarkers(parkings)
        //   },
        //   res => {})

        self.setData({
          requestLat: res.latitude,
          requestLng: res.longitude
        })
      }
    })
  },

  /**
   * 移至目标位置
   */
  moveToLocation: function (lat, lng) {
    var self = this;
    setTimeout(function () {
      var map = wx.createMapContext('map')
      map.moveToLocation({
        latitude: lat,
        longitude: lng,
      });
      self.findParking(self.data.scale)
    }, 1000)
  },

  /**
   * 请求位置权限
   */
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
})