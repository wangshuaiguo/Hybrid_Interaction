/**
 * Created by wangkejie.
 */
window.Hybrid = window.Hybrid || {};
let Hybrid = window.Hybrid;
 
let isIos = (/iphone|ipad/gi).test(navigator.appVersion);
let bridgePostMsg = (url) => {
  let s = 'dongfangdihybrid';

  window.webkit.messageHandlers.dongfangdihybrid.postMessage(url)

  // if (isIos) { m mm m
  //   // window.location = url;
  //   window.webkit.messageHandlers.dongfangdihybrid.postMessage("sdsadasdsad")
  // } else {
  //   let iframeObj = document.createElement('iframe');
  //   document.body.appendChild(iframeObj);
  //   iframeObj.style.cssText = 'display:none;width:0px;height:0px'
  //   iframeObj.src = url;
  //   setTimeout(function () {
  //     iframeObj.parentNode.removeChild(iframeObj)
  //   }, 1000)
  // }
};
let _getHybridUrl = (params) => {
  let k, paramStr = '', url = 'dongfangdi://';
  url += params.tagname + '?t=' + new Date().getTime(); //时间戳，防止url不起效
  if (params.callback) {
    url += '&callback=' + params.callback;
    delete params.callback;
  }
  if (params.param) {
    paramStr = typeof params.param == 'object' ? JSON.stringify(params.param) : params.param;
    url += '&param=' + encodeURIComponent(paramStr);
  }
  return url;
};
Hybrid.callback = (data) => {
  let callbackId = data.callback;
  if (!callbackId) return;

  if (typeof data == 'string') data = JSON.parse(data);

  if (callbackId.indexOf('header_') != -1 && Hybrid['Header_Event']) {
    Hybrid['Header_Event'][callbackId] && Hybrid['Header_Event'][callbackId](data.data || {});
  } else {
    // JSON.parse("sdsa");
    Hybrid[callbackId] && Hybrid[callbackId](data.data || {}, data);
  }
  return true;
};
window.requestHybrid = (params) => {
  //生成唯一执行函数，执行后销毁
  let tt = (new Date().getTime());
  let t = 'hybrid_' + tt;
  let tmpFn;

  //处理有回调的情况
  if (params.callback) {
    tmpFn = params.callback;
    params.callback = t;
    window.Hybrid[t] = function (data) {
      tmpFn(data);
      delete window.Hybrid[t];
    }
  }
  bridgePostMsg(_getHybridUrl(params));
};


