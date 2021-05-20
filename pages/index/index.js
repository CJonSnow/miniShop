// index.js
// 引入 用来发送请求的 方法 要补全路径
import { request } from "../../request/index.js"

Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    floorList:[],
  },
  onLoad() {
    // 1.发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', //仅为示例，并非真实接口地址。
    //   success: (res) => {
    //     // console.log(res.data);
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   }
    // });

    // 通过promise 的方式请求数据
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result =>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result =>{
      this.setData({
        catesList:result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result =>{
      this.setData({
        floorList:result.data.message
      })
    })
  },

})
