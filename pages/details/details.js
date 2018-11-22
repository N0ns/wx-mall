// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    good:{},
    isShow:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    var id = options.id
    this.setData({
      id:id
    })
    // console.log(this.data.id)
    wx.request({
      url: 'https://api.motherbuy.com/app/goods/getGoodsDetail/'+id, //仅为示例，并非真实的接口地址
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        self.setData({
          good:res.data.data
        })
      }
    })
    console.log(this.data)
  },

  
  doSelect(e){
    this.setData({
      isShow: true
    })

  },
  goToCart(){
    console.log('cart')
    wx.switchTab({
      url: '../cart/cart'
    })
  }
  


})