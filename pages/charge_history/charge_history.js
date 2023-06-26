// pages/charge_history/charge_history.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bills: [],
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.requestHistory()
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.data.pageNum++
    this.requestHistory()
  },

  requestHistory() {
    http.chargeHistory(this.data.pageNum,
      () => {
        if (this.data.pageNum == 1) {
          wx.showLoading()
        }
      },
      res => {
        wx.hideLoading()
        this.setData({
          bills: this.data.bills.concat(res.data.ls),
        })
      },
      res => wx.hideLoading()
    )
  },

  onChargeClick(e) {
    var histoty = this.data.bills[e.currentTarget.dataset.index]
    if (histoty.status == 0) {
      histoty.isMoto = false
      wx.navigateTo({
        url: '../charge_pay/charge_pay?ls=' + JSON.stringify(histoty),
      })
    }
  }
})