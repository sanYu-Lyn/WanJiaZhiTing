import http from '../../http/http_do'
import toast from '../../utils/utils_toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    hours: [-1, 2, 4, 6, 8, 9],
    sockets: [],
    hour: -1,
    amt: null,
    car: null,
    isMoto: false,
    curSocket: null,
    showSpinner: false,
    fee: []
  },

  onLoad: function (options) {
    this.setData({
      device: JSON.parse(options.device)
    })

    if (options.moto) {
      this.setData({
        isMoto: true
      })
    }

    if (options.socket) {
      this.setData({
        curSocket: {
          socket: options.socket
        }
      })
    }
  },

  onShow: function () {
    this.requestWallet()
    this.requestDevice()
  },

  onHourClick: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      hour: this.data.hours[index]
    })
  },

  onPayClick() {
    wx.navigateTo({
      url: '../me_wallet/me_wallet?to=charge',
    })
  },

  requestWallet() {
    http.userExpandInfo(
      () => {},
      res => {
        this.setData({
          amt: res.data.amt
        })
      },
      res => {}
    )
  },

  requestDevice() {
    http.deviceType(this.data.device.deviceno,
      () => {},
      res => {
        var feeDisplay = []
        for (var i in res.data.feeconfig) {
          var title = ''
          var price = ''
          if (res.data.feeconfig[i].s) {
            title = (res.data.feeconfig[i].s + '~' + res.data.feeconfig[i].e + '瓦')
            price = res.data.feeconfig[i].price + '元/小时'
          } else {
            title = (res.data.feeconfig[i].stime + '~' + res.data.feeconfig[i].etime)
            price = '充电费:' + res.data.feeconfig[i].price + '元/小时' + ' 服务费:' + res.data.feeconfig[i].serviceprice + '元'
          }
          feeDisplay.push({
            title: title,
            price: price
          })
        }

        this.setData({
          device: res.data.device,
          fee: feeDisplay,
          sockets: res.data.socketinfo ? res.data.socketinfo : []
        })

        if (this.data.curSocket) {
          for (var i in this.data.sockets) {
            if (this.data.sockets[i].socket == this.data.curSocket.socket) {
              this.setData({
                curSocket: this.data.sockets[i]
              })
              break
            }
          }
        }
      },
      res => {}
    )
  },

  onBindClick() {
    wx.navigateTo({
      url: '../fee_cars/fee_cars?to=charge',
    })
  },

  onCancelClick() {
    this.setData({
      car: null
    })
  },

  onChargeClick: function (e) {
    var socketId = this.data.curSocket ? this.data.curSocket : 1
    var name = this.data.isMoto ? '插座' : '充电枪'
    if (this.data.sockets.length > 0) {
      if (this.data.curSocket == null) {
        toast.normal('请选择您要充电的' + name)
        return
      }

      if (this.data.curSocket.status && this.data.curSocket.status != 0) {
        toast.normal('当前' + name + '不可用，请尝试使用其他插座')
        return
      }
    }

    if (this.data.isMoto) {
      this.doMotoCharge(socketId)
    } else {
      this.doCarCharge(socketId)
    }
  },

  doCarCharge(socketId) {
    const carno = this.data.car == null ? "" : this.data.car.carno
    http.chargeStart(
      this.data.device.id,
      carno,
      this.data.hour == -1 ? 0 : this.data.hour * 60,
      socketId,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  },

  doMotoCharge() {
    const carno = this.data.car == null ? "" : this.data.car.carno
    http.chargeMotoStart(
      this.data.device.id,
      carno,
      this.data.hour == -1 ? 0 : this.data.hour * 60,
      this.data.curSocket.socket,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  },

  onSocketTap(e) {
    this.setData({
      showSpinner: true
    })
  },

  onSocketItemTap(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      curSocket: this.data.sockets[index]
    })
  },

  onOutsideTap(e) {
    this.setData({
      showSpinner: false
    })
  }
})