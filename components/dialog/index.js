import { VantComponent } from '../common/component';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [openType],
  props: {
    show: Boolean,
    good:Object,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    }
  },
  data: {
    loading: {
      confirm: false,
      cancel: false
    },
    current: -1,
    quantity: 1,
    kindName: '请选择',
    min:1



  },
  watch: {
   
  },
  methods: {
    close: function close() {
      this.setData({
        show: false
      });
    },
    tapKind(event) {
      this.setData({
        current: event.currentTarget.dataset.current,
      //   id: GoodData.kinds[event.currentTarget.dataset.current].id,
        kindName: event._relatedInfo.anchorTargetText,
      //   total: GoodData.kinds[event.currentTarget.dataset.current].total,

          quantity: 1,

      //   smpic: GoodData.kinds[event.currentTarget.dataset.current].smpic,
        count: 1
      });
    },
    _handleZanQuantityPlus(e) {
      this.handle.call(this, e, +1);
    }, 
    _handleZanQuantityMinus(e) {
      this.handle.call(this, e, -1);
    },
     handle:function(e, num) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var disabled = dataset.disabled;
    var quantity = +dataset.quantity;

    if(disabled) return null;

    this.callback.call(this, componentId, quantity + num);
  },
    callback:function(componentId, quantity) {
    quantity = +quantity;
    var e = { componentId, quantity };
    // console.info('[zan:quantity:change]', e);
    if(this.handleZanQuantityChange) {
      this.handleZanQuantityChange(e);
    } else {
      console.warn('页面缺少 handleZanQuantityChange 回调函数');
    }
  },
    handleZanQuantityChange(e) {
      var componentId = e.componentId;
      var quantity = e.quantity;
      if(quantity<1){
        quantity=1
      }
      console.log(this)
      this.setData({
        max: this.data.good.stockNumber,
         quantity,
        count: quantity
      });
    },
    _handleZanQuantityBlur(e) {
      var dataset = e.currentTarget.dataset;
      var componentId = dataset.componentId;
      var max = +dataset.max;
      var min = +dataset.min;
      var value = e.detail.value;

      if (!value) {
        setTimeout(() => {
          this.callback.call(this, componentId, min);
        }, 16);
        this.callback.call(this, componentId, value);
        return '' + value;
      }

      value = +value;
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.callback.call(this, componentId, value);

      return '' + value;
    },
    addToCart(){
      var obj = {}
      var app = getApp()
      // console.log(this.data.quantity)
      obj.id = this.data.good.itemId
      obj.qty = this.data.quantity
      obj.value = false
      var swicth = false
      var len = app.globalData.cartGoods.length
      for(var i=0;i<len;i++){
        if (app.globalData.cartGoods[i].id === obj.id) {
          app.globalData.cartGoods[i].qty +=obj.qty
          break
        }
      }
      if(i===len){
        app.globalData.cartGoods.push(obj)
      }
        
        
      console.log(app.globalData.cartGoods)
    }

  }
  

});