// pages/invoice_title/invoice_title.js

import persistence from '../../utils/utils_persistence'
import utils from '../../utils/utils_tool'
import toast from '../../utils/utils_toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    name: '',
    num: '',
    def: false,
    addr: '',
    phone: '',
    bank_addr: '',
    bank_account: '',
    mobile: '',
    email: ''
  },

  onTypeClick: function (e) {
    this.setData({
      type: e.target.dataset.index,
    })
  },

  onDefClick: function (e) {
    this.setData({
      def: e.target.dataset.index == 0,
    })
  },

  submit: function () {

    if (utils.isEmpty(this.data.name) || utils.isEmpty(this.data.num) ||
      utils.isEmpty(this.data.mobile) || utils.isEmpty(this.data.email)) {
      toast.normal('您的信息填写不完整')
      return;
    }

    persistence.addInvoiceTitle(
      this.data.type,
      this.data.name,
      this.data.num,
      this.data.def,
      this.data.addr,
      this.data.phone,
      this.data.bank_addr,
      this.data.bank_account,
      this.data.mobile,
      this.data.email,
    )

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.loadTitles();

    wx.navigateBack();
  }
})