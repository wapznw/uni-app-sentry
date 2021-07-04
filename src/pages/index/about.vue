<template>
  <view>
    <view>hello about</view>
    <button @click="onClick">Click</button>
  </view>
</template>

<script>
export default {
  methods: {
    onClick() {
      throw new Error('错误信息')
    }
  }
}
</script>
