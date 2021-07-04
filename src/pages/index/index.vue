<template>
  <view class="content">
    <image class="logo" @click="tryError" src="/static/logo.png"></image>
    <view @click="go">
      <text class="title">{{ title }}</text>
    </view>
    <a url="about">About</a>
    <button @click="error2">error2</button>
    <button @click="error3">error3</button>
    <a url="/pages/test/test-index">子包</a>
  </view>
</template>

<script>
import * as Sentry from "sentry-miniapp2"

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    error2(){
      Promise.reject(Error('Promise.reject test'))
    },
    error3(){
      throw new Error('test throw error')
    },
    async tryError(a) {
      console.log(a.b);
      // 测试 异常是否可以上报
    //   throw new Error("lalalalalala");
    //   myUndefinedFunction();

    //   // 测试 async 函数中异常是否可以被 onError 捕获
    //   const ret = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("this is await ret.");
    //     }, 2000);
    //   });
    //   console.log(ret);
    //   myrUndefinedFunctionInAsyncFunction();

      // 一种可以在 async 函数中进行主动上报异常的方式
      try {
        myrUndefinedFunctionInAsyncFunction();
      } catch (e) {
        Sentry.captureException(e);
      }
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
