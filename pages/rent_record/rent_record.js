// pages/rent_record/rent_record.js
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
    this.requestRecord();
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

  requestRecord: function () {
    var pageNumber = this.data.paidPageNo;
    pageNumber++;

    http.payRentRecord(pageNumber,
      () => {},
      res => {
        let datas = this.data.datas;
        datas = datas.concat(res.data.content)

        this.setData({
          datas: datas,
          dataLoadAll: datas.length >= res.data.totalElement,
          dataPageNo: pageNumber
        })
        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  }
})