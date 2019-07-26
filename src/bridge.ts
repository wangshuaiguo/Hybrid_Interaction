/**
 * Created by Wangkejie on 2017/11/15.
 * webview交互懂房帝客户端
 * Version：1.0.0
 * Update Time：2018-11-15 17:00
 */
//此交互方案为现行方案，内容已被模糊替换

window.mcAPI = {
  isIOS: wapEnv() === "ios",
  //连接桥，必须在初始化API时设置好！
  jsBridge: window.object_android,
  /**
   * 获取当前客户端信息
   * @params callback 放回json串（{"statusHeight":"","deviceId":"d60552d8-2f92-3db6-b2e6-6864f9b8d2b8","platform":"Android/iOS","version":"1.0.0"}）
   */
  getClientInfo: function(callback: any) {
    if (this.isIOS) {
      this.mClientInfoCallback = callback;
      var params = {
        callbackName: "ClientInfoCallback"
      };

      iOS_schema_call("getClientInfos", params);
    } else {
      callback(this.jsBridge.getClientInfo());
    }
  },
  /**
   * 获取用户登陆状态
   * @param callback 返回bool值 true / false
   */
  isLogin: function(callback: any) {
    if (this.isIOS) {
      this.mIsLoginCallback = callback;
      var params = {
        callbackName: "isLoginCallback"
      };

      iOS_schema_call("isLogin", params);
    } else {
      callback(this.jsBridge.isLogin());
    }
  },
  /**
   * 登陆
   * @param callback 登陆完成后的回调 返回用户token
   */
  login: function(callback: any) {
    this.mLoginCallback = callback;
    if (this.isIOS) {
      var params = {
        callbackName: "cloginUserCallback"
      };

      iOS_schema_call("login", params);
    } else {
      // 异步
      this.jsBridge.login("loginUserCallback");
    }
  },
  /**
   * 获取当前登录用户信息
   * @params callback 放回json串（{"userId":"89022","username":"13120299638","userToken":"3vVB5vINs4qiFesObpUbzLfRVSU_CN","userAvatar":"http://www.aaaa.com"}）
   */
  getUserInfo: function(callback: any) {
    if (this.isIOS) {
      this.mUserInfoCallback = callback;
      var params = {
        callbackName: "userInfoCallback"
      };

      iOS_schema_call("getUserInfo", params);
    } else {
      callback(this.jsBridge.getUserInfo());
    }
  },
  /**
   * 网页分享
   * @param jsonParam {"type":"URL/MINAPP/IMAGE","iconURL":"https://www.baidu.com/img/bd_logo1.png","linkTitle":"baidu","linkContent":"baiduyixiaContent","linkURL":"https://www.baidu.com/","path":"page/index/detail"}
   */
  shareUrl: function(jsonParam: any) {
    if (this.isIOS) {
      var params = {
        jsonParam: jsonParam
      };
      iOS_schema_call("shareUrl", params);
    } else {
      this.jsBridge.shareUrl(jsonParam);
    }
  },
  // app统计事件
  statistic: function(eventName: string, jsonParam: any) {
    if (this.isIOS) {
      var params = {
        eventName: eventName,
        jsonParam: jsonParam
      };
      iOS_schema_call("statistic", params);
    } else {
      this.jsBridge.statistic(eventName, jsonParam);
    }
  },
  /**
   * 打开新页面(是否显示标题栏)
   * @param url新页面地址
   * @param typeStr：DEFAULT_TYPE（不显示标题栏）；TITLE_TYPE（显示标题栏）；TITLE_LOADING_TYPE（显示标题栏加载进度）
   */
  openNewPage: function(url: string, typeStr: string) {
    if (this.isIOS) {
      var params = {
        url: url,
        typeStr: typeStr
      };

      iOS_schema_call("openPublicHtmlActivity", params);
    } else {
      this.jsBridge.openPublicHtmlActivity(url, typeStr);
    }
  },
  /**
   * 标题栏控制（显示与否，指定返回，右侧分享，点击回调）
   * @param ifHasTitle 是否显示标题栏
   * @param jsonParam 标题栏控制参数json串 {"htmlTitle":"详情","htmlTitleShare":{"iconURL":"https://www.baidu.com/img/bd_logo1.png","linkContent":"baiduyixiaContent","linkTitle":"baidu","linkURL":"https://www.baidu.com/"}}
   * @param callBack
   */
  hasClientTitle: function(
    ifHasTitle: boolean,
    jsonParam: any,
    callBack?: any
  ) {
    if (callBack) {
      this.mClientTitleCallback = callBack;
      if (this.isIOS) {
        const params: any = {
          ifHasTitle: ifHasTitle,
          jsonParam: jsonParam,
          callbackName: "clientTitleCallback"
        };
        iOS_schema_call("hasClientTitle", params);
      } else {
        this.jsBridge.hasClientTitle(
          ifHasTitle,
          jsonParam,
          "clientTitleCallback"
        );
      }
    } else {
      if (this.isIOS) {
        const params: any = {
          ifHasTitle: ifHasTitle,
          jsonParam: jsonParam
        };
        iOS_schema_call("hasClientTitle", params);
      } else {
        this.jsBridge.hasClientTitle(ifHasTitle, jsonParam);
      }
    }
  },
  /**
   * 打开加载动画
   * @param msg 显示文本
   */
  showLoading: function(msg: string) {
    if (this.isIOS) {
      var params = {
        msg: msg
      };
      iOS_schema_call("showLoading", params);
    } else {
      this.jsBridge.showLoading(msg);
    }
  },
  /**
   * 关闭加载动画（如果有）
   */
  closeLoading: function() {
    if (this.isIOS) {
      iOS_schema_call("closeLoading", null);
    } else {
      this.jsBridge.closeLoading();
    }
  },
  /**
   * Html返回上一页
   */
  htmlGoBack: function() {
    if (this.isIOS) {
      iOS_schema_call("htmlGoBack", null);
    } else {
      this.jsBridge.htmlGoBack();
    }
  },
  /**
   * 关闭当前页面（客户端返回上一个页面）
   */
  clientFinish: function() {
    if (this.isIOS) {
      iOS_schema_call("clientFinish", null);
    } else {
      this.jsBridge.clientFinish();
    }
  },
  /**
   * 拨打电话
   * @param phone 拨打的电话号码
   */
  callPhone: function(phone: string | number) {
    if (this.isIOS) {
      var params = {
        phone: phone
      };
      iOS_schema_call("callPhone", params);
    } else {
      this.jsBridge.callPhone(phone);
    }
  },
  /**
   * 进入客服聊天
   * @param url 路由地址 {"targetId":"houseId","nickname":"","msgtype":"custommsg","titlestr":"标题","subtitlestr":"描述内容","pricestr":"2000元/月","imageurlstr":"https://www.baidu.com/img/bd_logo1.png","contenturlstr":"http://192.168.13.160:8080/bj/detail/second?id="}
   */
  entryCustomerIM: function(jsonParam: string) {
    if (this.isIOS) {
      var params = {
        jsonParam: jsonParam
      };
      iOS_schema_call("entryCustomerIM", params);
    } else {
      this.jsBridge.entryCustomerIM(jsonParam);
    }
  },
  /**
   * 路由跳转
   * * @param url 路由地址 dfrouter://com.bidewu/app/mainactivity?currentPage=2
   */
  routerJump: function(url: string) {
    if (this.isIOS) {
      var params = {
        url: url
      };
      iOS_schema_call("routerJump", params);
    } else {
      this.jsBridge.routerJump(url);
    }
  }
};
/**
 * 判断页面运行环境 返回ios、android、web
 */
function wapEnv() {
  const UA = window.navigator.userAgent.toLowerCase();
  let env: string = "";
  if (UA.includes("dongfangdi_ios_us")) {
    env = "ios";
  } else if (UA.includes("dongfangdi_android_ua")) {
    env = "android";
  } else {
    env = "web";
  }
  return env;
}

function iOS_schema_call(funcName: string, objMap: any) {
  window.webkit.messageHandlers[funcName].postMessage(objMap);
}
