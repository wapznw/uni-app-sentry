<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    onError (msg) {
      console.log('App onError', msg.length)
    },
    onUnhandledRejection(e){
      console.info('onUnhandledRejection', e)
    }
	}
</script>

<style>
	/*每个页面公共css */
</style>
