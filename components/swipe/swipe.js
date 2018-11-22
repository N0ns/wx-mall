Component({
  data: {
    background: ['https://img12.yiguoimg.com/d/items/2018/181120/9288734285014388_1125x652.jpg?w=1125&h=652', 'https://img11.yiguoimg.com/d/items/2018/181120/9288734288586100_1125x652.jpg?w=1125&h=652', 'https://img10.yiguoimg.com/d/items/2018/181120/9288734287308148_1125x652.jpg?w=1125&h=652','https://img11.yiguoimg.com/d/items/2018/181120/9288734288586100_1125x652.jpg?w=1125&h=652'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,

   
  },
  changeProperty: function (e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  ready() {
    
  }
  
})

