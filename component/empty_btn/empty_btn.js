// component/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '空空如也'
    },
    subtitle: {
      type: String,
      value: '什么也没有'
    },
    btnText: {
      type: String,
      value: '添加'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onButtonClick: function (e) {
      this.triggerEvent("commit")
    }
  },
})