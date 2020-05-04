<template>
  <div style="display: flex;flex-direction: column;">
    <div>
      <input type="file" accept="video/*" @change="testfunc" />
      <button class="btn btn-primary" type="button" @click="submit">upLoad!!!!!</button>
    </div>
    <video width="320" height="240" controls v-if="videoLink.length">
      <source :src="videoLink" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from '@/utils/auth' ; 
export default {
  name: "uploaderImage",
  props: {
    parentInput: "",
    parentInputUrl: ""
  },
  data() {
    return {
      videoLink: "",
      images: [],
      test: {
        file: ""
      }
    };
  },
  components: {},
  methods: {
    testfunc(e) {
      this.test.file = e.target.files[0];
      console.log("filename:", this.test.file);
    },
    post2DB() {
      console.log("video post2DB Start");
      var message = {
        type: "image",
        originalContentUrl: this.imageLink,
        previewImageUrl: this.imageLink
      };
      console.log("message");
      console.log(message);
      this.$emit("getJSON", message, this.realIndex);
    },

    submit() {
      
      let f = new FormData();
      f.append("file", this.test.file);
      // Upload image api
      let token = getToken('Token');
      axios({
        method: "post",
        url: "https://test-backend-dot-flow-263607.appspot.com/video_link",
        data: f,
        headers: {
          "Content-Type": "multipart/form-data",
          'x-access-token': token
        }
        // mimeType: "multipart/form-data"
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
</style>