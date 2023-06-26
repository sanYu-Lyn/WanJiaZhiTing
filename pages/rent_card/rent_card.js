// pages/rent_card/rent_card.js
import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: [],
    dataLoadAll: false,
    dataPageNo: 0,
  },

  onShow: function (options) {
    this.requestData(true)
  },

  onShareAppMessage: function () {

  },

  onShareTimeline: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.requestData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.dataLoadAll)
      this.requestData(false)
  },

  onRecordClick: function () {
    wx.navigateTo({
      url: '../rent_record/rent_record',
    })
  },

  requestData: function (isRefresh) {
    var pageNumber = this.data.paidPageNo;
    if (isRefresh) {
      pageNumber = 0;
    }
    pageNumber++;

    http.ticketOrderPaid(pageNumber,
      () => {},
      res => {
        let datas = this.data.datas;
        if (isRefresh) {
          datas = res.data
        } else {
          datas = datas.concat(res.data)
        }
        this.setData({
          datas: datas,
          dataLoadAll: true,
          dataPageNo: pageNumber
        })

        wx.stopPullDownRefresh()
      },
      res => {
        wx.stopPullDownRefresh()
      })
  },

  onAddClick: function (e) {
    var ticket = this.data.datas[e.currentTarget.dataset.index]
    console.log(ticket)
    var renewalOrder = {
      parkingId: ticket.parkid,
      parkingName: ticket.parkname,
      carId: ticket.id,
      carno1: ticket.carno1,
      carno2: ticket.carno2,
      startDate: ticket.sdate,
      endDate: ticket.edate
    }

    wx.navigateTo({
      url: '../rent_apply/rent_apply?renewalOrder=' + JSON.stringify(renewalOrder)
    })
  },

  onNoticeClick: function (e) {
    wx.navigateTo({
      url: '../base_notice/base_notice?src=2',
    })
  }
})