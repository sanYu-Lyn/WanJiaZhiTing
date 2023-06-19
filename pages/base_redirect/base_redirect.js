// pages/base_redirect/base_redirect.js
import util from '../../utils/utils_tool'
import scan from '../../utils/utils_qrcode'

Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.scene) {
      options.scene = 'https://xxx.xxx.xxx/qrcode?' + options.scene
      var to = util.getUrlParam(decodeURIComponent(options.scene), 'to');
      var id = util.getUrlParam(decodeURIComponent(options.scene), 'id');
      if (to) getApp().globalData.task = {
        to: to,
        id: id
      }
    }

    if (options.q) {
      var to = 'chargecar';
      var id = util.getUrlParam(decodeURIComponent(options.q), 'power');
      console.log(id)
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