// search.js

let util = require('../../utils/util.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "inputValue": "冯提莫",         // 输入的关键字
    "searchSongList": [],     // 返回数据的歌曲列表
    "isSongListEmpty": true,  // 判断 searchSongList 是否为空，默认为空（true）
    "searchPageNum": 1,       // 加载的第几页，默认第一页
    "isLoading": false,       // 是否“正在加载更多”，默认隐藏
    "isLoadComplete": false   // 是否“加载完成”，默认隐藏
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

  /**
   * 获取输入框的 value 值
   * @param  {Object} e 事件对象
   * @return {none}     无
   */
  getIptValue: function (e) {
    this.setData({
      "inputValue": e.detail.value
    });
  },

  clearIptValue: function () {
    this.setData({
      "inputValue": ""
    });
  },

  keywordSearchFn: function () {
    this.handleSearchData();
  },

  playMusic: function (e) {
    let songData = e.currentTarget.dataset.data;
    
    app.setGlobalData({
      "songData": songData
    });
    wx.navigateTo({
      url: '../player/player'
    })
  },

  scrolltolower: function () {
    let self = this;
    if (self.data.isLoading && !self.data.isLoadComplete) {
      self.setData({
        "searchPageNum": self.data.searchPageNum+1,
        "isLoading": false
      });
      self.handleSearchData();
    }
  },

  handleSearchData: function () {
    let self = this;
    let keyword = self.data.inputValue;
    let pageNum = self.data.searchPageNum;

    // 请求数据
    util.getSearchMusic(keyword, pageNum, function (res) {
      let resultList = res.showapi_res_body.pagebean.contentlist;
      let resultLen = res.showapi_res_body.pagebean.contentlist.length;
      if (resultLen != 0) {
        let songList = [];
        self.data.isSongListEmpty ? songList = resultList : songList = self.data.searchSongList.concat(resultList);
        self.setData({
          "searchSongList": songList,
          "isSongListEmpty": false,
          "isLoading": true
        });
      } else {
        self.setData({
          "isLoadComplete": true
        });
      }
    })
  }
})