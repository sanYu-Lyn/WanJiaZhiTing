// pages/detail/detail.js
import http from '../../http/http_do'
import pay from '../../utils/utils_pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    coupon: null,
    payCoupon: null, //缓存用户选择优惠券
    price: null,
    orderImg: null,
    payType: 0, //0钱包支付 1微信支付
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ret = decodeURIComponent(options.order)
    var ob = JSON.parse(ret)
    this.setData({
      order: ob,
    })

    if (this.data.order.amt == 0) {
      // wx.reLaunch({
      //   url: '../base_result/base_result?src=0',
      // })
    }
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

  /**
   * 支付订单
   */
  onPayClick: function () {
    var that = this;
    var amt = this.data.order.amt

    if (!amt || amt <= 0) {
      return
    }

    pay.scan_out(
      'dz-45-1', this.data.order.cardno, this.data.payType,
      () => {
        wx.showLoading()
      },
      res => {
        //更改当前订单的状态
        var order = this.data.order;
        order.status = 'payed'
        that.setData({
          order: order
        })

        //跳转到支付成功页面
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })

        wx.hideLoading()
      },
      res => {
        wx.hideLoading()
      }
    );
  },

  onConfirmClick: function (params) {
    wx.navigateBack()
  },

  /**
   * 点击优惠券
   */
  onCouponClick: function () {
    wx.navigateTo({
      url: '../fee_coupon/fee_coupon?order=' + JSON.stringify(this.data.order),
    })
  },

  /**
   * 查询需要支付的金额
   */
  inquery: function (couponId) {
    http.inquery(this.data.order.orderId, couponId,
      () => {},
      res => {
        this.setData({
          price: res.data
        })
      },
      res => {
        this.setData({
          coupon: null
        })
      })
  },

  /**
   * 查询车辆图片
   */
  requestInImage: function () {
    http.orderInImage(this.data.order.orderId,
      () => {},
      res => {
        this.setData({
          orderImg: 'data:image/jpeg;base64,' + res.data.img
        })
      },
      res => {}
    );
  },

  /**
   * 查询订单可用的优惠券
   */
  requestCoupon: function () {
    if (this.data.order.status == 'needToPay') {
      http.availableCoupons(this.data.order.orderId,
        () => {},
        res => {
          if (res.data.content && res.data.content.length > 0)
            this.setData({
              coupon: res.data.content[0],
            })
        },
        res => {})
    }
  },

  onWalletClick: function () {
    this.setData({
      payType: 0,
      coupon: null
    })
  },

  onWXClick: function () {
    this.setData({
      payType: 1,
      coupon: this.data.payCoupon
    })
  }
})