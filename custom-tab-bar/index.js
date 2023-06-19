import http from '../http/http_do'

Component({

  lifetimes: {
    ready() {
      this.requestCount()
    }
  },

  data: {
    count: 0,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#6EC8FF",
    list: [{
        pagePath: "/pages/park_list/park_list",
        text: "停车场",
        iconPath: "/image/btn_park_normal.png",
        selectedIconPath: "/image/btn_park_selected.png",
      },
      {
        pagePath: "/pages/park_pay/park_pay",
        text: "停车缴费",
        iconPath: "/image/btn_pay_normal.png",
        selectedIconPath: "/image/btn_pay_selected.png",
      },
      {
        pagePath: "/pages/me_center/me_center",
        text: "我的",
        iconPath: "/image/btn_me_normal.png",
        selectedIconPath: "/image/btn_me_selected.png",
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path

      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
      this.requestCount()
    },
    requestCount() {
      if (getApp().globalData.userInfo) {
        http.getUserCount(
          () => {},
          res => {
            this.setData({
              count: res.data.cdzcount + res.data.motorcount + res.data.parkcount
            })
          },
          res => {}
        )
      }
    }
  }
})