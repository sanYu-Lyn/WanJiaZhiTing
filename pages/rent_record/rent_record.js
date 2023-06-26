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

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

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