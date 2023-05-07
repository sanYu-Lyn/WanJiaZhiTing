// pages/invoice_send/invoice_send.js
import persistence from '../../utils/utils_persistence'
import toast from '../../utils/utils_toast'
import utils from '../../utils/utils_tool'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    num: '',
    desc: '',
    type: '',
    email: '',
    single: false,
    title: {},
    showActionsheet: false,
    titles: [], //已经保存好的发票抬头
    groups: [],
    orders: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //编辑发票抬头
    var titleJson = options.title;
    if (titleJson) {
      var title = JSON.parse(titleJson);
      this.setData({
        name: title.name,
        num: title.num,
        type: title.type,
        email: title.email,
        title: title
      })
    }

    //订单开发票
    var orderJson = options.orders;
    if (orderJson) {
      this.setData({
        orders: JSON.parse(orderJson)
      })
    }
    
    wx.setNavigationBarTitle({
      title: this.data.orders ? '开具发票' : '编辑发票抬头'
    })
  },

  onTypeClick: function (e) {
    this.setData({
      type: e.target.dataset.index,
    })
  },

  onSingleClick: function (e) {
    this.title.def = e.target.dataset.index == 0
    this.setData({
      title: title
    })
  },

  onTitleChoose: function (e) {
    var title = this.data.data[e.detail.index]
    title.index = e.detail.index
    this.setData({
      title: title,
      showActionsheet: false
    })
  },

  onAddClick: function (e) {
    this.loadInvoiceTitles();
  },

  /**
   * 加载用户已有的抬头
   */
  loadInvoiceTitles: function () {
    let ret = [];
    let arr = persistence.getInvoiceTitles()

    for (var i = 0; i < arr.length; i++) {
      ret[i] = {
        text: arr[i].name
      }
    }

    this.setData({
      titles: arr,
      groups: ret,
      showActionsheet: true
    })
  },

  submit: function () {
    if (utils.isEmpty(this.data.title.name) || (this.data.type == 0 && utils.isEmpty(this.data.title.num))) {
      toast.normal('信息填写不完整');
      return;
    }

    if (this.data.orders) { //todo 申请开票逻辑

    } else { //保存逻辑
      this.data.title.name = this.data.name
      this.data.title.num = this.data.num
      this.data.title.type = this.data.type
      this.data.title.email = this.data.email
      persistence.modifyInvoiceTitles(this.data.title)

      var pages = getCurrentPages();
      var prePage = pages[pages.length - 2];
      prePage.loadTitles();
    }

    wx.navigateBack()
  }
})