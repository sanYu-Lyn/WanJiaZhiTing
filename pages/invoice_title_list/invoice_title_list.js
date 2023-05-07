// pages/invoice_title_list/invoice_title_list.js

import persistence from '../../utils/utils_persistence'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTitles();
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

  loadTitles: function () {
    let ret = persistence.getInvoiceTitles();
    this.setData({
      titles: ret
    })
  },

  onDelClick: function (e) {
    let index = e.target.dataset.index;
    this.data.titles.splice(index, 1);
    this.setData({
      titles: this.data.titles
    })
    persistence.removeInvoiceTitle(index);
  },

  onEditClick: function (e) {
    let index = e.target.dataset.index;
    var obj = this.data.titles[index];
    obj.index = index;
    wx.navigateTo({
      url: '../invoice_send/invoice_send?title=' + JSON.stringify(obj),
    })
  },

  jumpAdd: function () {
    wx.navigateTo({
      url: '../invoice_title/invoice_title',
    })
  }
})