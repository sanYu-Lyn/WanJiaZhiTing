// pages/find_car/find_car.js
import persistence from '../../utils/utils_persistence'

Page({

  data: {
    cars: [],
    chooseIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestCars();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  requestCars: function () {
    var cars = persistence.getCarLicenses()
    this.setData({
      cars: cars,
    })
  },

  onItemClick: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      chooseIndex: index
    })
  },

  submit: function () {
    var car = this.data.cars[this.data.chooseIndex]
    if (car) {
      wx.navigateTo({
        url: '../find_result/find_result?car=' + JSON.stringify(car),
      })
    }
  }
})