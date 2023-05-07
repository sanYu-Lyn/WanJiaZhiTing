// pages/car_list/car_list.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 0,
    cars: [],
    loadAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.findBindCars(true)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.findBindCars(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.findBindCars(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  findBindCars: function (isRefresh) {
    http.findBindCars( () => {
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

  onCerfClick: function (e) {
    var index = e.target.dataset.index;
    var car = this.data.cars[index];
    if (car) {
      wx.navigateTo({
        url: '../car_certif/car_certif?car=' + JSON.stringify(car)
      })
    }
  },

  onUnbindClick: function (e) {
    var index = e.target.dataset.index;
    var car = this.data.cars[index];
    if (car) {
      wx.showModal({
        title: '解绑车辆',
        content: '是否解绑' + car.carno + '车辆',
        cancelColor: 'cancelColor',
        confirmText: '解绑',
        success: (res) => {
          if (res.confirm) {
            this.unbindCar(index)
          }
        }
      })
    }
  },

  jumpBindCar: function () {
    wx.navigateTo({
      url: '../car_bind/car_bind',
    })
  },

  unbindCar: function (index) {
    var car = this.data.cars[index];
    http.unbindCarNo(car.carno,
      () => {
        wx.showLoading();
      },
      res => {
        var cars = this.data.cars;
        cars.splice(index, 1);
        this.setData({
          cars: cars,
        })
        persistence.setCarLicense(cars)
        wx.hideLoading();
      },
      res => {
        wx.hideLoading();
      })
  }
})