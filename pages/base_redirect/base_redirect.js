// pages/base_redirect/base_redirect.js
import util from '../../utils/utils_tool'
import scan from '../../utils/utils_qrcode'

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.q) {
      var to = util.getUrlParam(decodeURIComponent(options.q), 'to');
      var id = util.getUrlParam(decodeURIComponent(options.q), 'id');
      if (to) getApp().globalData.task = {
        to: to,
        id: id
      }
    }
  },

  onShow: function () {
    scan.doTask() //通常配置直接指向个人中心页
  }
})