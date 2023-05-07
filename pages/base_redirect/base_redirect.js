// pages/base_redirect/base_redirect.js
import util from '../../utils/utils_tool'
import scan from '../../utils/utils_qrcode'

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.q) {
      var param = util.getUrlParam(decodeURIComponent(options.q), 'to');
      if (param) getApp().globalData.task = {
        to: param
      }
    }

    if (options.to) {
      getApp().globalData.task = {
        to: options.to,
      }
    }

    if (options.id && getApp().globalData.task) {
      getApp().globalData.task.id = options.id
    }

    scan.doTask() //通常配置直接指向个人中心页
  },
})