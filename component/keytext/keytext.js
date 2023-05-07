// component/keytext/keytext.js

Component({

  properties: {

    text: {
      type: String,
      observer: "_propertyDataChange"
    },

    keyword: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
    keyword: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _propertyDataChange: function (newVal) {
      let result = this.highlight(newVal, this.properties.keyword)
      this.setData({
        value: result
      })
    },

    highlight: function (str, key) {
      return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
    }
  },
})