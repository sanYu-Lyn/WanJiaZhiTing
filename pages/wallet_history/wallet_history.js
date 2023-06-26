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

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

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