// pages/me_center/me_center.js
import persistence from '../../utils/utils_persistence'
import http from '../../http/http_do'
import toast from '../../utils/utils_toast'
import {
  encriptPhone
} from '../../utils/utils_tool'

Page({

  data: {
    userInfo: null,
    nickname: '',
    userExpandInfo: null,
  },

  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (getApp().globalData.userInfo) {
      this.updateCount()
      this.setData({
        userInfo: getApp().globalData.userInfo,
        nickname: encriptPhone(getApp().globalData.userInfo.phone)
      })
    } else {
      this.setData({
        userInfo: null,
        userExpandInfo: null,
      })
    }
  },

  /**
   * 用户信息
   */
  jumpProfile: function () {
    wx.navigateTo({
      url: '../me_profile/me_profile',
    })
  },

  //停车卡
  onCardClick: function () {
    if (this.checkLoginState()) {
      wx.navigateTo({
        url: '../rent_card/rent_card',
      })
    }
  },

  //积分
  onScoreClick: function () {
    if (this.checkLoginState()) {
      toast.normal('功能暂未开放')
    }
  },

  //优惠券
  onCouponClick: function () {
    if (this.checkLoginState()) {
      toast.normal('功能暂未开放')
    }
    // if (this.checkLoginState()) {
    //   wx.navigateTo({
    //     url: '../fee_coupon/fee_coupon',
    //   })
    // }
  },

  //我的车辆
  onCarClick: function () {
    if (this.checkLoginState()) {
      wx.navigateTo({
        url: '../car_list/car_list',
      })
    }
  },

  //我的钱包
  onWalletClick: function () {
    if (this.checkLoginState()) {
      wx.navigateTo({
        url: '../me_wallet/me_wallet',
      })
    }
  },

  //停车账单
  onInvoiceClick: function () {
    if (this.checkLoginState()) {
      wx.navigateTo({
        url: '../fee_bill/fee_bill',
      })
    }
  },

  //电子发票
  onTicketClick: function () {
    if (this.checkLoginState()) {
      toast.normal('功能暂未开放')
    }
    // if (this.checkLoginState()) {
    //   wx.navigateTo({
    //     url: '../invoice_list/invoice_list',
    //   })
    // }
  },

  //意见反馈
  onFeedbackClick: function () {
    if (this.checkLoginState()) {
      toast.normal('功能暂未开放')
    }
    // if (this.checkLoginState()) {
    //   wx.navigateTo({
    //     url: '../me_feedback/me_feedback',
    //   })
    // }
  },

  updateCount: function () {
    // http.userExpandInfo(
    //   () => {},
    //   res => {
    //     this.setData({
    //       userExpandInfo: res.data
    //     })
    //     persistence.setPaySettings(res.data.isQuickPay)
    //   },
    //   res => {}
    // )
  },

  checkLoginState: function () {
    if (getApp().globalData.userInfo) {
      return true
    }
    wx.navigateTo({
      url: '../base_login/base_login',
    })
    return false;
  },

  onLoginClick: function () {
    wx.navigateTo({
      url: '../base_login/base_login',
    })
  }
})