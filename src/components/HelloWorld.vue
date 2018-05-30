<template>
  <div class="index-wrapper" >
    <h2 class="index-title">
      请选择类型：
    </h2>
    <div class="entry-wrapper">
      <flexbox>
        <flexbox-item>
          <div class="rateplan-entry domestic" @click="getNativeLocation">
            <h3 class="entry-title">获取定位信息</h3>
            <p class="desc">{{location}}</p>
            <div class="btn-wrapper">
              <x-button type="primary">开始获取</x-button>
            </div>
          </div>
        </flexbox-item>


        <flexbox-item>
          <div class="rateplan-entry foreign" @click="loginSuccess">
            <h3 class="entry-title">登录成功</h3>
            <p class="desc">{{jsData}}  </p>
            <div class="btn-wrapper">
              <x-button type="primary" >发送info</x-button>
            </div>
          </div>
        </flexbox-item>



      </flexbox>

      <flexbox-item>
        <div class="btn-wrapper" @click="jumptoconversationlist">
          <x-button type="primary" >跳转到聊天列表页</x-button>
        </div>
        <div class="btn-wrapper" @click="jumptoconversation">
          <x-button type="primary" >跳转到聊天页面</x-button>
        </div>
        <div class="btn-wrapper" @click="sharesdk">
          <x-button type="primary" >分享</x-button>
        </div>
        <div class="btn-wrapper" @click="configSetting(1)">
          <x-button type="primary" >修改通知</x-button>
        </div>
        <div class="btn-wrapper" @click="configSetting(2)">
          <x-button type="primary" >修改定位</x-button>
        </div>
        <div class="btn-wrapper" @click="navigationbarcontrol">
          <x-button type="primary" >导航条控制</x-button>
        </div>
        <div class="btn-wrapper" @click="openNewWeb">
          <x-button type="primary" >打开一个新的浏览器</x-button>
        </div>
        <div class="btn-wrapper" @click="loadPage">
          <x-button type="primary" >{{loadStateMsg}}</x-button>
        </div>
      </flexbox-item>

    </div>

  </div>

</template>
<script>
  import { Flexbox, FlexboxItem, XButton  } from 'vux'

  export default{
    name: 'HelloWorld',
    components: {
      Flexbox,
      FlexboxItem,
      XButton
    },
    mounted () {

    },
    data () {
      return {
        location:"lat 0,lon,0",
        jsData:"登录成功web的数据",
        showOrNot:true,
        loadStateMsg:'点击 开始加载页面',
        loadState:true
      }
    },
    methods: {

      jumptoconversationlist() {
        requestHybrid({
          tagname: 'jumptoconversationlist',
          param:{

          },
          callback(data) {

          }
        })
      },


      isFirstLogin() {
        requestHybrid({
          tagname: 'isfirstlogin',
          param: {

          },
          callback(data) {
           let isfirstlogin = data.isfirstlogin ;// 0或者空是第一次，返回有值都是已登录 ，数字 1
            let imageBase64 = data.imagedata;//imagedata 为base64图片
          }
        })
      },

      jumptoconversation() {
        requestHybrid({
          tagname: 'jumptoconversation',
          param: {
            targetId:'buzhengchang',  //让你们传bdw+userid，非只传userid，原生拼接了bdw，哎！坑
            msgtype:'custommsg', //custommsg 自定义消息 如果缺少该字段或者为空，则仅仅是打开聊天

            titlestr:'测试消息=》比得屋办公室南向两居 满五年且在京无其它住宅',
            subtitlestr:"5室1厅/140㎡/西南",
            pricestr:"1000万",
            imageurlstr:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3011097111,3568123653&fm=27&gp=0.jpg',
            contenturlstr:'https://www.baidu.com',

            nickname: '顾问名字'
          },
          callback(data) {

          }
        })

      },
      sharesdk() {
        requestHybrid({
          tagname: 'sharesdk',
          param: {
            title:'标题',
            text:'内容',
            titleUrl:'sdsda',
            url:'地址',
            imgurl:'图片',
          },
          callback(data) {

          }
        })
      },
      configSetting(type) { // 1,notification | 2,location
        if (type === 1) {

          requestHybrid({
            tagname: 'syssetting',
            param: {
              settingType: 'notification'
            },
            callback(data) {

            }
          })
        } else if (type === 2) {
          requestHybrid({
            tagname: 'syssetting',
            param: {
              settingType: 'location'
            },
            callback(data) {

            }
          })
        }
      },
      getNativeLocation() {
        let _self = this;
        requestHybrid({
          tagname: 'getlocation',
          param: {

          },
          callback (data) {
            let lat = data.lat;
            let lon = data.lon;
            _self.location = `lat:${lat} \n lon: ${lon}`;
          }
        })
      },

      // loginSuccess() {
      //   let _self = this;
      //   requestHybrid({
      //     tagname: 'userinfo',
      //     param: {
      //       avatar:'196.png',
      //       rongCloudToken:'uGFD93eUu4dzz82kKye7vVoSlgIFRM61ybFrIBxl3190o4ytZeWJL5Ov7oUpR7uPrk6jZMZMdDsqzAQSdCI+6cpZFcXh2s9yW56waa6ZIHbfTky+EqQgymD4C+TJykhq',
      //       userId:'1',
      //       userName:"15116929213",
      //       userOnlySign: "29237243f27b4009acb8a37b5da758c0"
      //     },
      //     callback(data) {
      //       _self.jsData = "发送成功"
      //     }
      //   })
      // },
      loginSuccess() {
        let _self = this;
        requestHybrid({
          tagname: 'userinfo',
          param: {
            avatar:'196.png',
            rongCloudToken:'+6cpZFcXh2s9yW56waa6ZIHbfTky+EqQgymD4C+TJykhq',
            userId:'1',
            userName:"15116929213",
            userOnlySign: "",
            cookiename:'',
            cookievalue:''
          },
          callback(data) {
            _self.jsData = "发送成功"
          }
        })
      },

      navigationbarcontrol() {
        var control = '';
        if (this.showOrNot) {
          control = 'show';
          this.showOrNot = false;
        } else {
          control = 'hidden';
          this.showOrNot = true;
        }
        requestHybrid({
          tagname: 'navigationbar',
          param: {
            control: `${control}`,//hidden,show
            title: '比得屋'
          },
          callback(data) {

          }
        })
      },


      openNewWeb() {

        if (window.localStorage) {
          alert("浏览器支持localStorage");
        }else {
          alert("浏览器不支持localStorage");
        }


        requestHybrid({
          tagname: 'opennewwebview',
          param: {
            newh5url: 'https://www.baidu.com' //新页面地址，主意和app不要有任何关系
          },
          callback(data) {

          }
        })


      },

      loadPage() {

        var loadstate1 = "";
        if (this.loadState) {
          this.loadStateMsg = '点击结束加载';
          this.loadState = false;
          loadstate1 = 'start';
        } else  {
          this.loadStateMsg = '点击开始加载';
          this.loadState = true;
          loadstate1 = 'end';

        }

        requestHybrid({
          tagname: 'loadstate',
          param: {
            loadstate:`${loadstate1}`, //start开始   end结束
          },
          callback(data) {

          }
        })
      }

    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  .index-title
    font-weight: 500
    text-align: center
    color #fff
    margin-top 2.25rem
    margin-bottom 1.5rem
    font-size 1.125rem
  .entry-wrapper
    padding 0 1.25rem
  .vux-flexbox .vux-flexbox-item:nth-child(2)
    margin-left 0.9rem!important
  .rateplan-entry
    background #fff
    height 12.5rem
    text-align left
    position relative
    border-radius 0.625rem
    padding 1.25rem
    box-sizing border-box
    background-repeat no-repeat
    background-size contain
    background-position: 0 50%;
    &.domestic
      border 1px dashed #ff6900
      background-image  url("/static/img/texture_domestic.png")
    &.foreign
      border 1px dashed #ff6900
      background-image  url("/static/img/texture_abroad.png")
    .entry-title
      font-size 1rem
      color #96a8b9
    .desc
      color #525252
      margin-top 0.5625rem
      font-size 1.125rem
    .btn-wrapper
      position absolute
      bottom 1.25rem
      right 1.25rem
      .weui-btn
        width 5rem
        height 1.6rem
        line-height 1.6rem
        font-size 0.825rem!important
        padding 0
        background-color #ff6900
        &:active
          background-color #ff6900!important
  .discount-wrapper
    margin 0.9rem auto
    width calc(100% - 2.5rem)
    padding 1.25rem 0
    background-image  url("/static/img/bg-index.png")
    background-repeat no-repeat
    background-size cover
    border-radius 0.625rem
    text-align center
    background-color #fff
    box-shadow 0 1px 3px rgba(0,0,0,0.2)
    .discount-title
      font-size 1.5rem
      margin-bottom 0.75rem
      font-weight: 500
      color #fff
    .discount-btn-wrapper
      width 9.125rem
      margin 0 auto
      .weui-btn
        height 2.1875rem!important
        line-height 2.1875rem
        padding 0
        background-color #e7593a
        box-shadow 0 3px 6px rgba(137, 42, 0, 0.35)
        text-align center
        font-size 1.125rem
        &:active
          background-color #cd5134!important
    .desc
      margin-top 0.625rem
      font-size: 0.925rem
      font-weight: 500
      text-align: center
      color: #ffeb86
</style>
