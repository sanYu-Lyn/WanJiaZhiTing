//app.js
import persistence from './utils/utils_persistence'

App({

  globalData: {
    userInfo: null,
    province: null,
    city: null,
    latitude: -1,
    longitude: -1,

    task: null, //扫码或公众号进入APP的任务 '1'=缴费出场

    navigationBarHeight: 0,
    statusBarHeight: 0,
  },

  onLaunch: function () {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navigationBarHeight = navHeight;
        this.globalData.statusBarHeight = navTop;
        this.globalData.windowHeight = res.windowHeight;
      }
    })
    var loginUser = persistence.getUser();
    this.globalData.userInfo = loginUser;
  }
})