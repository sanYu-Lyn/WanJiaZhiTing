Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        pagePath: "/pages/park_list/park_list",
        text: "停车场"
      },
      {
        pagePath: "/pages/park_pay/park_pay",
        text: "停车缴费"
      },
      {
        pagePath: "/pages/me_center/me_center",
        text: "我的"
      }
    ]
  },
  attached() {},

  methods: {
    switchTab(e) {

      const data = e.currentTarget.dataset
      const url = data.path

      console.log('------------------------->' + data.index)
      console.log('------------------------->' + data.path)

      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})