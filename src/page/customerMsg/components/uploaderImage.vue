<template>
  <div>
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      @data-change="dataChange"
      :data-images="images"
    ></vue-upload-multiple-image>
    <!-- <add-button-text v-bind:key="buttonIndex" v-for="buttonIndex in buttonCnt"></add-button-text> -->
    <!-- <el-upload
      class="upload-demo"
      drag
      list-type="picture-card"
      action="#"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload> -->
    <div>
      <input type="file" accept="image/*" @change="testfunc">
      <button class="btn btn-primary" type="button" @click="submit">upLoad!!!!!</button>
    </div>
  </div>
</template>

<script>
import VueUploadMultipleImage from "vue-upload-multiple-image";
import axios from "axios";
export default {
  name: "uploaderImage",
  props: {
    parentInput: "",
    parentInputUrl: ""
  },
  data() {
    return {
      images: [],
      test: {
        file:''
      }
    };
  },
  components: {
    VueUploadMultipleImage
  },
  methods: {
    testfunc(e) {
      this.test.file = e.target.files[0];
      console.log("filename:", this.test.file);
    },
    submit() {
      let f = new FormData();
      f.append("image", this.test.file);
      // Upload image api
      axios({
        method: "post",
        url: "https://api.imgur.com/3/image",
        data: f,
        headers: {
          Authorization: "Client-ID 144a5de7a410723"
        },
        mimeType: "multipart/form-data"
      }).then(response => {
        console.log(response);
      });
    },
    beforeUpload(file) {
      let f = new FormData();
      f.append("image", file);
      // Upload image api
      axios({
        method: "post",
        url: "https://api.imgur.com/3/image",
        data: f,
        headers: {
          Authorization: "Client-ID 144a5de7a410723"
        },
        mimeType: "multipart/form-data"
      }).then(response => {
        console.log(response);
      });
    },

    uploadImageSuccess(formData, index, fileList) {
      console.log("data1", formData, index, fileList);
      console.log("parentInput", this.parentInput);
      console.log("parentInputURL", this.parentInputUrl);
      console.log("images", fileList[0].name);
      var f = new FormData();
      f.append("image", fileList[0]);
      // Upload image api
      // axios({
      //   method: 'post',
      //   url: 'https://api.imgur.com/3/image',
      //   data: f,
      //   headers: {
      //     Authorization: "Client-ID 144a5de7a410723",
      //     Accept: 'application/json'
      //     //mimeType: 'multipart/form-data'
      //   }
      // }).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      var r = confirm("remove image");
      if (r == true) {
        done();
      } else {
      }
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },
    dataChange(data) {
      console.log(data);
    },
    postBotFlex() {
      console.log("postBotFlex777");
      var commdity_template = {
        type: "bubble",
        hero: {
          type: "image",
          url:
            "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            label: "Action",
            uri: "https://www.youtube.com/"
          }
        }
      };
      var header = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      // axios({
      //   method: 'post',
      //   baseURL: 'https://ez8-pj0.appspot.com',
      //   url: '/json_entry',
      //   data: {
      //     type: "bubble",
      //     hero: {
      //       type: "image",
      //       url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
      //       size: "full",
      //       aspectRatio: "20:13",
      //       aspectMode: "cover",
      //       action: {
      //         type: "uri",
      //         label: "Action",
      //         uri: "https://www.youtube.com/"
      //       }
      //     }
      //   },
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(response => {
      //   console.log(response)
      // })

      axios
        .post(
          "https://ez8-pj0.appspot.com/json_entry",
          commdity_template,
          header
        )
        .then(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
h1,
h2 {
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