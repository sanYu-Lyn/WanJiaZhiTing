import http from '../../http/http_do'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: null,
    license_index: 0,
    license_content: ['', '', '', '', '', '', ''],
    license_green: '新能源',
    keyboard_show: false,
    keyboard_type: 1,
    numberEnable: true,
    specialEnable: true,
  },

  onLoad: function (options) {
    this.setData({
      device: JSON.parse(options.device)
    })
  },

  onColorClick: function (e) {
    let tabIndex = e.target.dataset.index;
    this.setData({
      license_index: tabIndex
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
          license_green: '新能源',
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
        keyboard_type: type,
        keyboard_show: false,
        license_green: content,
        numberEnable: index != 2,
        specialEnable: index == 6,
      })
    } else {
      this.setData({
        keyboard_type: type,
        license_content: content,
        keyboard_show: content[6].length == 0 || this.data.license_index == 1,
        numberEnable: index != 1,
        specialEnable: index == 6,
      })
    }
  },

  onChargeClick: function (e) {
    var license = this.data.license_content.join('');
    if (this.data.license_index == 1) {
      license = license + this.data.license_green;
    }
    http.chargeStart(this.data.device.id, license,
      () => wx.showLoading(),
      res => {
        wx.reLaunch({
          url: '../base_result/base_result?src=8',
        })
      },
      res => {}
    )
  }
})