// pages/rent_coupon/rent_coupon.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0,
    order: null,

    usefulData: null,
    usefulLoadAll: false,
    usefulPageNum: 0,

    uselessData: null,
    uselessLoadAll: false,
    uselsessPageNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.order) {
      var order = JSON.parse(options.order);
      this.setData({
        order: order
      })
    }
    this.couponFind(true);
    // this.applyCoupon();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.couponFind(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.tab_index == 0) {
      if (!this.data.usefulLoadAll)
        this.couponFind(false);
    } else {
      if (!this.data.uselessLoadAll)
        this.requestPaidOrders(false);
    }
  },

  onTabClick: function (e) {
    this.setData({
      'tab_index': e.target.dataset.index
    })
    let data = this.data.tab_index == 0 ? this.data.usefulData : this.data.uselessData;
    if (!data || data.length == 0) {
      this.couponFind(true)
    }
  },

  onActiveClick: function (e) {
    var index = e.currentTarget.dataset.index;
    var coupon = this.data.uselessData[index];
    var self = this;
    wx.showModal({
      title: '确定支付' + coupon.activePrice + '元激活优惠券吗?',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#6EC7FF',
      cancelColor: '#5C5C5C',
      success(res) {
        if (res.confirm) {
          self.activeCoupon(e)
        }
      }
    })
  },

  onCouponClick: function (e) {
    if (this.data.order) {
      var index = e.currentTarget.dataset.index;
      var coupon = this.data.usefulData[index];
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        coupon: coupon,
        payCoupon: coupon,
        payType: 0
      })
      prevPage.inquery(coupon.couponId);
      wx.navigateBack()
    } else {

    }
  },

  applyCoupon: function () {
    http.couponApply(1,
      () => {},
      res => {},
      res => {})
    http.couponApply(2,
      () => {},
      res => {},
      res => {})
    http.couponApply(4,
      () => {},
      res => {},
      res => {})
  },

  activeCoupon: function (e) {
    var index = e.currentTarget.dataset.index;
    var coupon = this.data.uselessData[index];
    http.couponActive(coupon.couponId, coupon.activePrice,
      () => {
        wx.showLoading()
      },
      res => {
        this.setData({
          tab_index: 0,
          usefulData: null,
          usefulLoadAll: false,
          usefulPageNum: 0,
          uselessData: null,
          uselessLoadAll: false,
          uselsessPageNum: 0
        })
        wx.hideLoading()
        this.couponFind(true)
        this.activeCouponSuccess()
      },
      res => {
        wx.hideLoading()
      })
  },

  activeCouponSuccess: function () {
    wx.showModal({
      title: '激活成功',
      cancelText: '回到首页',
      confirmText: '去使用',
      confirmColor: '#6EC7FF',
      cancelColor: '#5C5C5C',
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 3,
          })
        }
      }
    })
  },

  couponFind: function (isRefresh) {
    var pageNum = this.data.tab_index == 0 ? this.data.usefulPageNum : this.data.uselsessPageNum
    if (isRefresh) {
      pageNum = 0;
    }
    pageNum++

    if (this.data.order) {
      http.availableCoupons(this.data.order.orderId,
        () => {},
        res => {
          this.success(isRefresh, pageNum, res)
        },
        res => {
          wx.stopPullDownRefresh()
        })
    } else {
      http.couponFind(this.data.tab_index == 0 ? 'valid' : 'expired', pageNum,
        () => {},
        res => {
          this.success(isRefresh, pageNum, res)
        },
        res => {
          wx.stopPullDownRefresh()
        })
    }
  },

  success: function (isRefresh, pageNum, res) {
    let data = this.data.tab_index == 0 ? this.data.usefulData : this.data.uselessData;
    if (isRefresh) {
      data = res.data.content
    } else {
      data = data.concat(arr)
    }

    if (this.data.tab_index == 0) {
      this.setData({
        usefulData: data,
        usefulLoadAll: data.length >= res.data.totalElement,
        usefulPageNum: pageNum
      })
    } else {
      this.setData({
        uselessData: data,
        uselessLoadAll: data.length >= res.data.totalElement,
        uselsessPageNum: pageNum
      })
    }

    wx.stopPullDownRefresh()
  },
})