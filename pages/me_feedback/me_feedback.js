// pages/me_feedback/me_feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advice: false,
    coupon: false,
    exception: false,
    card: false,
    price: false,
    other: false,
    count: 0
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

  onContentChanged: function (e) {
    var len = e.detail.value.length;
    this.setData({
      count: len
    })
  },

  onImproveClick: function () {
    let val = !this.data.advice;
    this.setData({
      advice: val,
    })
  },

  onCouponClick: function () {
    let val = !this.data.coupon;
    this.setData({
      coupon: val,
    })
  },

  onExceptionClick: function () {
    let val = !this.data.exception;
    this.setData({
      exception: val,
    })
  },

  onCardClick: function () {
    let val = !this.data.card;
    this.setData({
      card: val,
    })
  },

  onPriceClick: function () {
    let val = !this.data.price;
    this.setData({
      price: val,
    })
  },

  onOtherClick: function () {
    let val = !this.data.other;
    this.setData({
      other: val,
    })
  }

})