// pages/types/types.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empty: true,
    cartGoods: [],
    arr:[],
    checkAll:false,
    total:0,
    isEdit:false
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app = getApp()
    var len = this.data.arr.length
    var that = this
    if (app.globalData.cartGoods.length > 0) {
      this.setData({
        empty: false,
        arr: app.globalData.cartGoods
      })
    }
    if(len!=this.data.arr.length){
      app.globalData.cartGoods.forEach(function(item,index){
        if(index>=len){
          that.getCartGoods(item.id)
        }
        
      })
      
    }
    
    this.setData({
      checkAll:false
    })
    this.upDateTotal()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  goIndex() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  getCartGoods(id) {
    var that = this
    wx.request({
      url: 'https://api.motherbuy.com/app/goods/getGoodsDetail/' + id, //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var arr = that.data.cartGoods
      
        arr.push(res.data.data)
        arr=Array.from(new Set(arr))
        console.log(arr)
        that.setData({
          cartGoods:arr
        })

      }
    })
  },
  checkboxChange: function (e) {
    // 子项影响全选
    let allItems = this.data.arr.length;
    // 判断全选的情况
    if (e.detail.value.length == allItems) {
      this.setData({
        checkAll: true
      });
    } else {
      this.setData({
        checkAll: false,
      });
    }
    // 处理选择一项
    // 系统会自动识别选中项的携带值，用e.detail.value获得
    var arr = this.data.arr, values = e.detail.value;
    for (var i = 0, lenI = arr.length; i < lenI; i++) {
      arr[i].checked = false; // 先清空所有选中
      for (var j = 0, lenJ = values.length; j < lenJ; j++) {
        if (arr[i].value == values[j]) { // 通过values来匹配选中项
          arr[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      arr: arr
    });
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.upDateTotal()
  },
  checkAll(e) { // 处理全选按钮
    let arr = this.data.arr;
    if (e.detail.value == 'checkAll') {
      for (let i in arr) {
        arr[i].checked = true;
        this.setData({
          arr: arr
        });
      }
    } else {
      for (let i in arr) {
        arr[i].checked = false;
        this.setData({
          arr: arr
        });
      }
    }
    let checkAll = this.data.checkAll;
    this.setData({
      checkAll: !checkAll
    });
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.upDateTotal();
  },

  upDateTotal() { // 更新总价
  // console.log(this.data.arr,this.data.cartGoods)
    let totalPrice = 0;
    let checkboxItems = this.data.checkboxItems;
    let len = this.data.arr.length;
    let arr = this.data.arr
    let arrSelect = []
    this.data.cartGoods.forEach((item,index) => {
      if (arr[index].checked == true) {
        totalPrice += parseFloat(item.minPrice) * arr[index].qty;
        this.setData({
          total: totalPrice.toFixed(2)
        });
        arrSelect.push(item)
      }
    });
    if (arrSelect.length == 0) { // 如果全不选总价为0
      this.setData({
        total: '0.00'
      });
    }
  },
  toggleEdit() {
    let isEdit = this.data.isEdit;
    this.setData({
      isEdit: !isEdit
    });
  },
  _handleZanQuantityPlus(e){
    console.log(e.target.dataset.index)
    var idx = e.target.dataset.index
    this.handleQty(idx,1)

  },
  _handleZanQuantityMinus(e){
    var idx = e.target.dataset.index
    this.handleQty(idx, -1)
  },
  _handleZanQuantityBlur(e){
    console.log(e)
  },
  handleQty(i,num){
    var arr = this.data.arr
    arr[i].qty+=num*1
    if(arr[i].qty<1){
      arr[i].qty=1
    }
    this.setData({
      arr
    })
  }
  

})