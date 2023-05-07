// pages/fee/fee.js
import toast from '../../utils/utils_toast'
import persistence from '../../utils/utils_persistence'
import http from '../../http/http_do'
import authorize from '../../utils/utils_authorize'
import poi from '../../utils/utils_map'
import utils from '../../utils/utils_tool'
import pay from '../../utils/utils_pay'

Page({

  data: {
    'license_index': 0,
    'license_content': ['', '', '', '', '', '', ''],
    'license_green': '新能源',
    'keyboard_show': true,
    'keyboard_type': 1,
    'numberEnable': true,
    'specialEnable': true,
    'target': {
      'to': 'default'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.src
    this.fetchContent(type)

  },

  onLoad: function (options) {
    if (options.target) {
      var target = JSON.parse(options.target)

      this.setData({
        'target': target
      })

      var title
      if (target.to == 'bind_to_pay') {
        title = '停车缴费'
      } else {
        title = '绑定车辆'
      }
    }

    wx.setNavigationBarTitle({
      title: title
    })

    this.bindProvince()
  },

  onColorClick: function (e) {
    let tabIndex = e.target.dataset.index;
    this.setData({
      'license_index': tabIndex
    })
    let index = this.data.license_content.findIndex((item) => {
      return item.length == 0;
    });
    this.onKeyboardChanged(index, this.data.license_content)
  },

  onNumberClick: function (e) {
    this.setData({
      'keyboard_show': true
    })
  },

  onKeyboardOkClick: function (e) {
    this.setData({
      'keyboard_show': false
    })
  },

  onKeyboardDelClick: function (e) {
    if (this.data.license_index == 1 && this.data.license_green.length != 3) { //绿色车牌
      this.setData({
        'license_green': '新能源',
      })
    } else {
      let content = this.data.license_content.reverse();
      let index = content.findIndex((item) => {
        return item.length != 0;
      });
      if (index != -1) {
        content[index] = '';
        this.onKeyboardChanged(content.length - index - 1, content.reverse())
        this.setData({
          'license_green': '新能源',
        })
      }
    }
  },

  onKeyboardInputChanged: function (e) {
    if (e.detail) {
      let content = this.data.license_content;
      let index = content.findIndex((item) => {
        return item.length == 0;
      });

      if (index != -1) {
        content[index] = e.detail;
        this.onKeyboardChanged(index + 1, content)
      } else if (this.data.license_index == 1) { //绿色车牌
        this.onKeyboardChanged(content.length, e.detail)
      }
    }
  },

  /**
   * 内容变化
   * @param {*} index 当前指向的空白格
   * @param {*} content 填充的内容
   */
  onKeyboardChanged: function (index, content) {
    let type = content[0].length == 0 ? 1 : 0;
    if (content.length == 1 && this.data.license_index == 1) { //绿色车牌
      this.setData({
        'keyboard_type': type,
        'keyboard_show': false,
        'license_green': content,
        'numberEnable': index != 2,
        'specialEnable': index == 6,
      })
    } else {
      this.setData({
        'keyboard_type': type,
        'license_content': content,
        'keyboard_show': content[6].length == 0 || this.data.license_index == 1,
        'numberEnable': index != 1,
        'specialEnable': index == 6,
      })
    }
  },

  submit: function () {
    if ((this.data.license_index == 1 && this.data.license_green.length != 1) ||
      this.data.license_content[6].length == 0) {
      toast.normal('请填写完整的车牌号')
      return
    }
    var license = this.data.license_content.join('');
    if (this.data.license_index == 1) {
      license = license + this.data.license_green;
    }

    if (this.data.target.to == 'bind_to_pay') { //停车场缴费
      this.bindToPay(null, license, this.convertColor())
    } else { //绑定车牌
      this.bindCarNo(license)
    }

  },

  /**
   * 绑定车牌
   */
  bindCarNo: function (carNo) {
    http.bindCarNo(carNo, this.convertColor(),
      () => {
        wx.showLoading()
      },
      res => {
        this.updateCars();
      },
      res => {
        wx.hideLoading()
      }
    )
  },

  convertColor: function () {
    switch (this.data.license_index) {
      case '0':
        return 'blue';
      case '1':
        return 'green';
      case '2':
        return 'yellow';
      case '3':
        return 'black';
    }
    return 'blue';
  },

  /**
   * 更新保存信息
   */
  updateCars: function () {
    http.findBindCars(() => {},
      res => {
        persistence.setCarLicense(res.data.content)
        // this.doTask(res.data.content[res.data.content.length - 1]);
        this.bindToAddCar()
      },
      res => {
        wx.hideLoading()
      })
  },

  doTask: function (car) {
    switch (this.data.target.to) {
      case 'bind_to_pay':
        break;
      case 'bind_to_rent':
        this.bindToRent(car)
        break;
      default:
        this.bindToAddCar()
        break
    }
  },

  /**
   * 绑定结束，车辆列表
   */
  bindToAddCar: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.findBindCars(true)
    wx.navigateBack()
  },

  /**
   * 根据车id查询是否有待支付订单
   */
  bindToPay: function (carId, carNo, plateColor) {
    pay.pay_out('1', carNo, 1,
      () => wx.showLoading(),
      res => {
        wx.hideLoading()
        wx.reLaunch({
          url: '../base_result/base_result?src=0',
        })
      },
      res => wx.hideLoading()
    )
  },

  /**
   * 绑定车辆，回到租车位界面
   */
  bindToRent: function (car) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      chooseCar: car
    })
    wx.navigateBack()
  },

  /**
   * 自动填充省简写
   */
  bindProvince: function () {
    this.requestProvince(
      res => {
        var simple = utils.provinceMap(res)
        if (simple && this.data.license_content[0].length == 0) {
          this.onKeyboardInputChanged({
            detail: simple
          })
        }
      }
    )
  },

  /**
   * 请求用户的省份信息
   */
  requestProvince: function (callback) {
    var province = getApp().globalData.province
    if (!province) {
      authorize.open(
        'scope.userLocation',
        function () {
          wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: true,
            success: function (res) {
              poi.searchByLocaton(res.latitude, res.longitude,
                res => {
                  callback(res.data.result.address_component.province)
                },
                res => {})
            }
          })
        },
        function (res) {})
    } else {
      callback(province)
    }
  }
})