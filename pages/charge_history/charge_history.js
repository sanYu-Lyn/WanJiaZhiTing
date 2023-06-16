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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

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
      () => wx.showLoading(),
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
    var histoty = this.data.datas[e.currentTarget.dataset.index]
    if (histoty.status == 0) {
      histoty.isMoto = false
      wx.navigateTo({
        url: '../charge_pay/charge_pay?ls=' + JSON.stringify(histoty),
      })
    }
  }
})