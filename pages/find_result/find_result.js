// pages/find_result/find_result.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 3, //0查找中，1有结果，2无结果，3结果异常
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var car = JSON.parse(options.car);
    this.findCar(car.carId)
  },

  findCar: function (carId) {
    http.findCarPostion(
      carId,
      () => {
        this.setData({
          state: 0
        })
      },
      res => {
        this.setData({
          state: 1,
          result: res.data
        })
      },
      res => {
        this.setData({
          state: res == '未找到车辆的入场记录' ? 2 : 3
        })
      })
  }
})