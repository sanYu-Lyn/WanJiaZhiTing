// pages/wallet_history/wallet_history.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    dataLoadAll: false,
    dataPageNo: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestHistory();
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

  requestHistory: function (isRefresh) {
    var pageNumber = this.data.paidPageNo;
    if (isRefresh) {
      pageNumber = 0;
    }
    pageNumber++;

    http.walletHistory(pageNumber,
      () => {},
      res => {
        let datas = this.data.datas;
        if (isRefresh) {
          datas = res.data
        } else {
          datas = datas.concat(res.data)
        }
        this.setData({
          datas: datas,
          // dataLoadAll: datas.length >= res.data.totalElement,
          // dataPageNo: pageNumber
        })
        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  }
})