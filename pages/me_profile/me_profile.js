// pages/me_profile/me_profile.js
import login from '../../utils/utils_login'
import {
  encriptPhone
} from '../../utils/utils_tool';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: getApp().globalData.userInfo,
    nickname: '',
  },

  onLoad: function (options) {
    this.setData({
      userInfo: getApp().globalData.userInfo,
      nickname: encriptPhone(getApp().globalData.userInfo.phone)
    })
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  /**
   * 退出登录
   */
  loginOut: function () {
    wx.showModal({
      title: '确定退出登录吗？',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#6EC7FF',
      cancelColor: '#5C5C5C',
      success(res) {
        if (res.confirm) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            userInfo: null,
            count: null
          })
          login.logOut()
          wx.navigateBack();
        }
      }
    })
  },
})