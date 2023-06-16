// component/navbar/navbar.js
const app = getApp()

Component({

  properties: {
    text: {
      type: String,
      value: 'Wechat'
    },
    count: {
      type: Number,
      value: 0
    },
    city: {
      type: String,
      value: '柳州市'
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    },
    profile: {
      type: Boolean,
      value: false
    }
  },
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    navigationBarHeight: (app.globalData.statusBarHeight + 44) + 'px'
  },

  methods: {
    jumpSearch: function () {
      wx.navigateTo({
        url: '../../pages/base_search/base_search',
      })
    }
  }
})