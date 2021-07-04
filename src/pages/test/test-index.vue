<template>
  <view class="test-index">
    <view class="title">子包错误测试</view>
    <button @click="throwError">抛出自定义错误</button>
    <button @click="promiseReject">promiseReject</button>
  </view>
</template>

<script>
export default {
  name: "test-index",
  methods: {
    throwError() {
      throw Error('抛出自定义错误')
    },
    promiseReject(){
      Promise.reject(Error('Promise 错误'))
    }
  }
}
</script>

<style scoped>
  .test-index {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-size: 38rpx;
  }
</style>
