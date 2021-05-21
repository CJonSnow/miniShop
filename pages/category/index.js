// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    // 左侧的菜单数据
    leftMenuList:[],
    // 右侧的商品数据
    rightContent:[],
    // 被点击的左侧菜单
    currentIndex:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    /**
     * 1. 先判断本地存储中有没有旧的数据
     *    {time:Date.now(),data:[...]}
     * 2. 没有旧数据 直接发送新请求
     * 3. 有旧的数据 且 旧数据也没有过期，直接使用存储中的旧数据即可
     * 4. web中的本地存储和小程序有什么区别
     *    web:不管存入的是什么类型的数据，最终都会先调用toString(),把数据变成字符串在存入
     *    小程序: 没有类型转换这步，存什么类型的数据进去，获取的时候就是什么类型 
    */
    // 1. 获取本地存储的数据
    const Cates = wx.getStorageSync('cates')
    // 2. 判断
    if(!Cates){
      // 不存在 发送请求获取数据
      this.getCates();
    }else {
      // 有旧的数据 定义过期时间
      if (Date.now()-Cates.time>1000*10) {
        // 重新发送请求
        this.getCates();
      }else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  getCates(){
    request({
      url: "/categories"
    })
    .then(res => {
      this.Cates = res.data.message;
      //把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      //左侧菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //右侧内容数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e){
    /*
      1.获取被点击的标题的索引
      2.给data中的currentIndex赋值
      3.根据不同的索引值来渲染右侧的商品内容
    */
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 每次点击对右侧scrollTop重新赋值置顶
      scrollTop:0
    })
  }
})