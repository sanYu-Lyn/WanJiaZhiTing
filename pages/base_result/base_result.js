// pages/base_result/base_result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 0,
    subTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var src = options.src;
    var title = '';
    var subTitle = '';
    switch (src) {
      case '0':
        title = '停车缴费';
        subTitle = '支付完成';
        break
      case '1':
        title = '开具发票';
        subTitle = '提交成功';
        break
      case '2':
        title = '意见反馈';
        subTitle = '提交成功';
        break
      case '3':
        title = '车牌申诉';
        subTitle = '申诉成功';
        break
      case '4':
        title = '租车位';
        subTitle = '支付完成';
        break
      case 'charge':
      case '5':
        title = '钱包充值';
        subTitle = '支付完成';
        break
      case '6':
        title = '停车缴费';
        subTitle = '无需支付';
        break
      case '7':
        title = '停车进场';
        subTitle = '进场成功';
        break
      case '8':
        title = '停车充电';
        subTitle = '开始充电';
        break
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      subTitle: subTitle,
      src: src
    })
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  onCompleteClick: function () {
    switch (this.data.src) {
      case '3':
        wx.navigateBack({
          delta: 3,
        })
        break
      case '4':
        wx.navigateBack({
          delta: 2,
        })
        break
      case '5':
        wx.navigateBack()
        break
      case '6':
        wx.reLaunch({
          url: '/pages/park_list/park_list',
        })
        break
      case '7':
        wx.reLaunch({
          url: '/pages/park_list/park_list',
        })
        break
      default:
        wx.reLaunch({
          url: '/pages/park_list/park_list',
        })
        break
    }
  }
})