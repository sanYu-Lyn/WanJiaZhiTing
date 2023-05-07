// pages/me_invoice/me_invoice.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 0,

    undoData: [],
    undoPageNum: 0,
    undoLoadAll: false,

    doneData: [],
    donePageNum: 0,
    doneLoadAll: false,

    chooseIndex: [],
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.requestUndoData(true)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestUndoData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.findBindCars(false)
  },

  onTabClick: function (e) {
    this.setData({
      'tab_index': e.target.dataset.index
    })
  },

  jumpAddTitle: function () {
    wx.navigateTo({
      url: '../invoice_title_list/invoice_title_list',
    })
  },


  jumpNext: function () {
    var orders = [];
    for (var order of this.data.undoData) {
      if (order.selected) {
        orders.push(order);
      }
    }

    var orderStr = JSON.stringify(orders);
    wx.navigateTo({
      url: '../invoice_send/invoice_send?orders=' + orderStr,
    })
  },

  onChooseClick: function (e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.undoData[index];
    if (!data.selected) {
      data.selected = false
    }
    data.selected = !data.selected;
    this.setData({
      undoData: this.data.undoData
    })
  },

  requestUndoData: function (isRefresh) {
    var pageNo = this.data.undoPageNum
    if (isRefresh) {
      pageNo = 0;
    }
    pageNo++

    http.findInvoiceable(pageNo,
      () => {},
      res => {
        if (res.content) {
          let data = this.data.undoData;
          if (isRefresh) {
            data = res.content
          } else {
            data = data.concat(res.content)
          }
          this.setData({
            undoData: data,
            loadAll: data.length >= res.data.totalElement,
            undoPageNum: pageNo
          })
        }
        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  }
})