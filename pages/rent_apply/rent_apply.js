// pages/rent_apply/rent_apply.js
import utils from '../../utils/utils_tool'
import toast from '../../utils/utils_toast'
import persistence from '../../utils/utils_persistence'
import http from '../../http/http_do'
import pay from '../../utils/utils_pay'

Page({
  data: {
    isAgree: true, //是否同意协议
    showCarsASheet: false, //显示选择车辆列表底部弹出框
    showCarsBSheet: false, //显示选择车辆列表底部弹出框
    startDate: null, //开始日期 
    carNums: [], //用户的车牌号列表
    chooseACar: '', //用户选中的车辆
    chooseBCar: '', //用户选中的车辆
    cars: [], //用户车辆列表
    parking: null, //停车场
    monthCard: null, //月卡
    lat: null, //纬度
    lng: null, //经度
    amt: -1, //应当支付金额
    payType: [{
        'text': '钱包支付'
      },
      {
        'text': '微信支付'
      }
    ], //支付方式
    groundType: null, //停车场类型
    showPayTypeSheet: false, //显示支付方式底部弹出框
    monthAvaible: [{
        count: 1,
        value: '1个月'
      },
      {
        count: 2,
        value: '2个月'
      },
      {
        count: 3,
        value: '3个月'
      },
      {
        count: 6,
        value: '6个月'
      },
      {
        count: 9,
        value: '9个月'
      },
      {
        count: 12,
        value: '12个月'
      }
    ],

    monthCount: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.renewalOrder) { //续费
      var renewalOrder = JSON.parse(options.renewalOrder)
      var startDate = utils.nextDate(renewalOrder.endDate, 1)
      this.setData({
        startDate: startDate,
        chooseACar: {
          carId: renewalOrder.carId,
          carNo: renewalOrder.carNo
        },
        parking: {
          parkId: renewalOrder.parkingId,
          name: renewalOrder.parkingName
        }
      })
    }

    if (options.parking) { //购买
      var parking = JSON.parse(options.parking)
      this.setData({
        parking: parking,
        lat: getApp().globalData.latitude,
        lng: getApp().globalData.longitude
      })
    }

    if (options.card) {
      this.setData({
        monthCard: JSON.parse(options.card)
      })
    }
    // this.loadGroundType();
  },

  /**
   * 协议点击
   */
  onAgreeClick: function () {
    let that = this;
    this.setData({
      'isAgree': !that.data.isAgree
    })
  },

  /**
   * 选择车牌号码
   */
  onCarAClick: function () {
    this.loadCarLicense();
    this.setData({
      showCarsASheet: true
    })
  },

  onCarBClick: function () {
    this.loadCarLicense();
    this.setData({
      showCarsBSheet: true
    })
  },

  /**
   * 选择停车场类型
   */
  onGroundClick: function () {
    this.setData({
      showGroundTypeSheet: true
    })
  },

  /**
   * 选择开始日期
   */
  bindStartDateChange: function (e) {
    var startDate = e.detail.value;
    this.setData({
      startDate: startDate
    })
    this.fetchRentPrice();
  },

  /**
   * 选择优惠券
   */
  onCouponClick: function () {
    wx.navigateTo({
      url: '../rent_coupon/rent_coupon',
    })
  },

  /**
   * 选择支付
   */
  onPayClick: function () {
    if (!this.check()) {
      return
    }

    this.setData({
      showPayTypeSheet: true
    })
  },

  /**
   * 支付
   */
  onPayChoose: function (e) {
    var index = e.detail.index

    this.setData({
      showPayTypeSheet: false
    })

    pay.pay_choose(
      this.data.parking.id,
      this.data.chooseACar.carno == null ? '' : this.data.chooseACar.carno,
      this.data.chooseBCar.carno == null ? '' : this.data.chooseBCar.carno,
      this.data.startDate,
      this.data.monthCount,
      index,
      () => {
        wx.showLoading()
      },
      res => {
        wx.hideLoading()
        wx.navigateTo({
          url: '../base_result/base_result?src=4',
        })
      },
      res => {
        wx.hideLoading()
      }
    )
  },

  /**
   * 选择车牌
   * @param {*} e 
   */
  onCarAChoose: function (e) {
    if (e.detail.index == this.data.carNums.length - 1) {
      var jsonStr = JSON.stringify(utils.generateTarget(2))
      wx.navigateTo({
        url: '../car_bind/car_bind?target=' + jsonStr,
      })
    } else {
      this.setData({
        chooseACar: this.data.cars[e.detail.index]
      })
    }

    this.setData({
      showCarsASheet: false
    })
  },

  onCarBChoose: function (e) {
    if (e.detail.index == this.data.carNums.length - 1) {
      var jsonStr = JSON.stringify(utils.generateTarget(2))
      wx.navigateTo({
        url: '../car_bind/car_bind?target=' + jsonStr,
      })
    } else {
      this.setData({
        chooseBCar: this.data.cars[e.detail.index]
      })
    }

    this.setData({
      showCarsBSheet: false
    })
  },

  /**
   * 选择停车场类型
   */
  onGroundChoose: function (e) {
    this.setData({
      ground: this.data.groundType[e.detail.index],
      showGroundTypeSheet: false
    })

    this.fetchRentPrice();

  },

  onMonthClick: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      monthCount: this.data.monthAvaible[index].count
    })
    this.fetchRentPrice()
  },

  /**
   * 加载用户已有的车牌号码
   */
  loadCarLicense: function () {
    let ret = [];
    let arr = persistence.getCarLicenses()
    for (var i = 0; i < arr.length; i++) {
      ret[i] = {
        text: arr[i].carno
      }
    }

    ret.push({
      text: '+添加车牌'
    })

    this.setData({
      carNums: ret,
      cars: arr
    })
  },

  fetchRentPrice: function () {
    if (this.data.monthCard && this.data.monthCount > 0) {
      if (this.data.monthCard.iscomplex === 'Y') {
        const map = JSON.parse(this.data.monthCard.amtrule)
        this.setData({
          amt: map[this.data.monthCount]
        })
      } else {
        this.setData({
          amt: this.data.monthCard.amt * this.data.monthCount
        })
      }
    }
  },

  check: function () {
    if (!this.data.isAgree) {
      toast.normal('请先同意用户协议')
      return false
    }

    if (!this.data.chooseACar && !this.data.chooseBCar) {
      toast.normal('请选择车牌号')
      return false
    }

    if (this.data.chooseACar.carno == this.data.chooseBCar.carno) {
      toast.normal('重复的车牌号')
      return false
    }

    if (utils.isEmpty(this.data.startDate)) {
      toast.normal('请选择开始日期')
      return false
    }

    if (this.data.monthCount < 0) {
      toast.normal('请选择购买时限')
      return false
    }

    return true
  }
})