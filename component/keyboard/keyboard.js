Component({
  externalClasses: ['v-panel'],

  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    //1为省份键盘，其它为英文键盘
    keyBoardType: {
      type: Number,
      value: 1,
    },
    specialEnable: {
      type: Boolean,
      value: false
    },
    numberEnable: {
      type: Boolean,
      value: false
    }
  },
  data: {
    keyVehicle1: '陕京津沪冀豫云辽',
    keyVehicle2: '黑湘皖鲁新苏浙赣',
    keyVehicle3: '鄂桂甘晋蒙吉闽贵',
    keyVehicle4: '粤川青藏琼宁渝',
    keyNumber: '1234567890',
    keyEnInput1: 'QWERTYUIOP',
    keyEnInput2: 'ASDFGHJKL',
    keyEnInput3: 'ZXCVBNM',
    keyEnInput4: '使港澳领学挂',
  },
  methods: {
    vehicleTap: function (event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          this.triggerEvent('delete');
          this.triggerEvent('inputchange');
          break;
        case 'ok':
          this.triggerEvent('ok');
          break;
        default:
          if (!this.properties.numberEnable && this.data.keyNumber.indexOf(val) != -1) {
            return //数字键盘不可用
          } 
          if (!this.properties.specialEnable && this.data.keyEnInput4.indexOf(val) != -1) {
            return //特殊车牌不可用
          }
          this.triggerEvent('inputchange', val);
      }
    },
  }
});