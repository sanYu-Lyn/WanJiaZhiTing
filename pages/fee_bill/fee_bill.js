// pages/fee_bill/fee_bill.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_display: 1, // 0 both 1 未支付 2 已支付
    tab_index: 0,
    margin: 0,

    doneOrders: [],
    donePageNum: 0,

    waitOrders: [],
    waitPageNum: 0,
  },

  onLoad(option) {
    var display = 2
    if (option.display) {
      display = option.display
    }
    if (display == 0) {
      this.setData({
        tab_index: 0,
        tab_display: display,
        margin: 120
      })
    } else if (display == 1) {
      this.setData({
        tab_index: 0,
        tab_display: display,
        margin: 0
      })
    } else {
      this.setData({
        tab_index: 1,
        tab_display: display,
        margin: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // this.requestNoPayOrders(true);
    this.data.waitOrders = []
    this.data.doneOrders = []
    if (this.data.tab_display == 0 || this.data.tab_display == 2) {
      this.requestPaidOrders();
    }
    if (this.data.tab_display == 0 || this.data.tab_display == 1) {
      this.requestWaitOrders()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestPaidOrders(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.tab_index == 1) {
      this.requestPaidOrders(false);
    }
  },

  onTabClick(e) {
    this.setData({
      tab_index: e.target.dataset.index
    })
  },

  onPaidClick: function (e) {
    // var order = this.data.doneOrders[e.currentTarget.dataset.index]
    // wx.navigateTo({
    //   url: '../fee_pay/fee_pay?order=' + JSON.stringify(order),
    // })
  },

  onWaitClick: function (e) {
    var order = this.data.waitOrders[e.currentTarget.dataset.index]
    console.log(order)
    order = {
      amt: order.amt,
      cardno: order.carno,
      intime: order.intime,
      parktime: order.parktime,
      parkName: order.parkname,
      parkid: order.parkid,
      status: 'needToPay'
    }
    console.log(order)
    wx.navigateTo({
      url: '../fee_pay/fee_pay?order=' + JSON.stringify(order),
    })
  },

  /**
   * 查询已经支付的订单
   */
  requestPaidOrders: function () {
    const that = this
    http.parkOrderPaid(this.data.donePageNum + 1,
      () => {},
      res => {
        this.setData({
          doneOrders: this.data.doneOrders.concat(res.data),
          donePageNum: that.data.donePageNum++
        })
      },
      res => {})
  },

  /**
   * 查询未支付的订单
   */
  requestWaitOrders: function () {
    var that = this
    // http.parkOrderWait('京E344444',
    //   () => {},
    //   res => {
    //     that.setData({
    //       waitOrders: that.data.waitOrders.concat(res.data)
    //     })
    //   },
    //   res => {})
  },
})