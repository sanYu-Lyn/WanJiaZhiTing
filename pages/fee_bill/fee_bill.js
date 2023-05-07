// pages/fee_bill/fee_bill.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'tab_index': 1,
    'noPayOders': [],
    'noPayLoadAll': false,
    'noPayPageNo': 0,
    'paidOrders': [],
    'paidLoadAll': false,
    'paidPageNo': 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.requestNoPayOrders(true);
    this.requestPaidOrders(true);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.tab_index == 0) {
      this.requestNoPayOrders(true);
    } else {
      this.requestPaidOrders(true);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.tab_index == 0) {
      if (!this.data.noPayLoadAll)
        this.requestNoPayOrders(false);
    } else {
      if (!this.data.paidLoadAll)
        this.requestPaidOrders(false);
    }
  },

  onTabClick: function (e) {
    this.setData({
      'tab_index': e.target.dataset.index
    })
  },

  onPayClick: function (e) {
    var order = this.data.noPayOders[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../fee_pay/fee_pay?order=' + JSON.stringify(order),
    })
  },

  onPaidClick: function (e) {
    var order = this.data.paidOrders[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../fee_pay/fee_pay?order=' + JSON.stringify(order),
    })
  },

  /**
   * 查询已经支付的订单
   */
  requestPaidOrders: function (isRefresh) {
    var pageNumber = this.data.paidPageNo;
    if (isRefresh) {
      pageNumber = 0;
    }
    pageNumber++;

    http.parkOrderPaid(pageNumber,
      () => {},
      res => {
        let data = this.data.paidOrders;
        if (isRefresh) {
          if (res.data) data = res.data
        } else {
          data = data.concat(res.data)
        }

        this.setData({
          'paidOrders': data,
          'paidLoadAll':true,//  data.length >= res.data.totalElement,
          'paidPageNo': pageNumber
        })
        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  },

  /**
   * 查询未支付的停车订单
   */
  requestNoPayOrders: function (isRefresh) {
    var pageNumber = this.data.noPayPageNo;
    if (isRefresh) {
      pageNumber = 0;
    }
    pageNumber++;

    http.parkOrderNoPay('鄂A88888', pageNumber,
      () => {},
      res => {
        let data = this.data.noPayOders;
        if (isRefresh) {
          data = res.data.content
        } else {
          data = data.concat(res.data.content)
        }

        this.setData({
          'noPayOders': data,
          'noPayLoadAll': data.length >= res.data.totalElement,
          'noPayPageNo': pageNumber
        })
        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  }
})