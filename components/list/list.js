// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    goodslist:[]
     
 
  },

  methods: {
    tapGood(e){
      console.log(e.currentTarget)
      wx.navigateTo({
        url: '../details/details?id=' + e.currentTarget.dataset.gid
      })
    }
  },
  ready(){
    var self = this
    wx.request({
  url: 'https://api.motherbuy.com/decorate/appHomePage/getTitleItems/968680993849675778', //仅为示例，并非真实的接口地址
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data.items)
        self.setData({
          goodslist: res.data.data.items
        })
      }
    })
  }
})
