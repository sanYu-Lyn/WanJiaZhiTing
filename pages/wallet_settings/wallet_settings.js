// pages/wallet_settings/wallet_settings.js
import http from '../../http/http_do'
import persistence from '../../utils/utils_persistence'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      checked: persistence.getPaySettings()
    })
  },

  onSwitchClick: function () {
    var param = !this.data.checked
    http.quickPaySwitch(param,
      () => {},
      () => {
        persistence.setPaySettings(param)
      },
      () => {})
    this.setData({
      checked: param
    })
  },
  onRuleClick: function () {
    wx.navigateTo({
      url: '../base_notice/base_notice?src=1',
    })
  }
})