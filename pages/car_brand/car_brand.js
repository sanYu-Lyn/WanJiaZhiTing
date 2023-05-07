// pages/car_brand/car_brand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prefix: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    groups: [{
        word: 'A',
        data: ['AAAAAAA', 'AA', 'AAA', 'AAAA']
      },
      {
        word: 'B',
        data: ['BBBBBBB', 'BB', 'BBB', 'BBBB']
      },
      {
        word: 'C',
        data: ['CCCCCCC', 'CC', 'CCC', 'CCCC']
      },
      {
        word: 'D',
        data: ['DDDDDDDD', 'DD', 'DDDD', 'DDDDD']
      },
      {
        word: 'E',
        data: ['EE', 'EEEEE', 'EEEEE', 'EEEEEEEE']
      },
      {
        word: 'F',
        data: ['FFFF', 'FFFFFFFF', 'FFFFFFFF', 'FFFFF']
      },
      {
        word: 'G',
        data: ['GG', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF', 'GGGGGG', 'GGGG', 'FFFFGGGGGF']
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onWordClick: function (e) {
    var index = e.currentTarget.dataset.index
    var word = this.data.prefix[index]

    let query = wx.createSelectorQuery().in(this);
    query.selectViewport().scrollOffset()
    query.select("#gird_prefix").boundingClientRect();
    query.select("#" + word).boundingClientRect();
    query.exec(function (res) {
      var miss = res[0].scrollTop + res[2].top - res[1].bottom;
      wx.pageScrollTo({
        scrollTop: miss,
        duration: 300
      });
    });
  }
})