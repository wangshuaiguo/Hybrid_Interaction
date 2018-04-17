<template>
  <div class="index-wrapper" >
    <h2 class="index-title">
      请选择类型：
    </h2>
    <div class="entry-wrapper">
      <flexbox>
        <flexbox-item>
          <div class="rateplan-entry domestic" @click="jsGetNativeInfo">
            <h3 class="entry-title">JS调原生</h3>
            <p class="desc">{{nativeData}}</p>
            <div class="btn-wrapper">
              <x-button type="primary">开始获取</x-button>
            </div>
          </div>
        </flexbox-item>


        <flexbox-item>
          <div class="rateplan-entry foreign" @click="nativeGetJSInfo">
            <h3 class="entry-title">原生调JS</h3>
            <p class="desc">{{jsData}}  </p>
            <div class="btn-wrapper">
              <x-button type="primary" >获取后弹窗</x-button>
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
        nativeData:"获取原生数据",
        jsData:"原生获取JS数据"
      }
    },
    methods: {

      jumptoconversationlist() {
        requestHybrid({
          tagname: 'jumptoconversationlist',
          param:{

          }
        })
      },
      jumptoconversation() {
        requestHybrid({
          tagname: 'jumptoconversation',
          param: {
            targetId:'wangkejie'
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
            comment:'图片',
          }
        })
      },

      jsGetNativeInfo () {

        let _self = this;
        requestHybrid({
          tagname: 'getinfo',
          param: {
            key: 'nativeKey',
          },
          callback(data){
            _self.nativeData = data;
            // _self.nativeData = "sdsd";
          }
        });
      },

      nativeGetJSInfo() {
        let _self = this;

        requestHybrid({
          tagname: 'setheader',
          param: {
            title: '全部订单历史'
          },
          callback (data) {


            requestHybrid({
              tagname: 'getinfo',
              param: {
                key: 'nativeKey',
              },
              callback(data) {
                _self.nativeData = "sdsd";

              }}
            )
            _self.nativeData = data.data;
          }
        })
      },

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
    text-align right
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
      font-size 1.75rem
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
