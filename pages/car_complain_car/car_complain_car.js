// pages/car_complain_car/car_complain_car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0, // 0默认 1手动输入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onInputClick: function () {
    this.setData({
      type: 1
    })
  },

  onCameraClick: function () {
    wx.navigateTo({
      url: '../base_result/base_result?src=3',
    })
    var car = this.data.car;
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      sourceType: 'camera',
      success(res) {
        if (res.tempFilePaths[0] && car) {
          http.uploadCarCertif(res.tempFilePaths[0], car.carNo,
            () => {
              wx.showLoading()
            },
            res => {
              wx.hideLoading()
            },
            res => {
              wx.hideLoading()
            })
        }
      }
    })
  }
})