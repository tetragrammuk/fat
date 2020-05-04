<template>
  	<div class="shareContainer" ref="shareContainer">
		<div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center;">
			<vue-upload-multiple-image
			@upload-success="uploadImageSuccess"
			@before-remove="beforeRemove"
			@edit-image="editImage"
			@data-change="dataChange"
			:data-images="images"
			></vue-upload-multiple-image>
		</div>
	</div>
</template>

<script>
	import VueUploadMultipleImage from 'vue-upload-multiple-image'
	import axios from 'axios'
    import * as mutils from '@/utils/mUtils'

	export default {
	  data(){
			return {
				images: []
			}
		},
		components:{
			VueUploadMultipleImage

		},
		mounted(){
			mutils.setContentHeight(this,this.$refs.shareContainer,250);
		},
		methods: {
			uploadImageSuccess(formData, index, fileList) {
			console.log('data', formData, index, fileList)
			console.log(formData)
			console.log(fileList)
			// Upload image api
			// axios.post('http://your-url-upload', { data: formData }).then(response => {
			//   console.log(response)
			// })
			},
			beforeRemove (index, done, fileList) {
			console.log('index', index, fileList)

			
			var r = confirm("remove image")
			if (r == true) {
				done()
			} else {
			}
			},
			editImage (formData, index, fileList) {
			console.log('edit data', formData, index, fileList)
			},
			dataChange (data) {
			console.log(data)
			}
			
			
		}

	}
</script>

<style lang="less" scoped>
	.shareContainer{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 20px;
		

	}

	#my-strictly-unique-vue-upload-multiple-image {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	}

	h1, h2 {
	font-weight: normal;
	}

	ul {
	list-style-type: none;
	padding: 0;
	}

	li {
	display: inline-block;
	margin: 0 10px;
	}

	a {
	color: #42b983;
	}
</style>
