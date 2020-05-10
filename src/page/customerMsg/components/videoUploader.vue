<template>
  <div>
    <div
      v-if="videoLink.length == 0"
      class="uploader"
      @dragenter="OnDragEnter"
      @dragleave="OnDragLeave"
      @dragover.prevent
      @drop="onDrop"
      :class="{ dragging: isDragging, hadFile: isHadFile }"
    >
      <div
        v-loading="loading"
        v-show="!images.length"
        style="display: flex;flex-direction: column; justify-content: center;align-items: center;"
      >
        <i class="el-icon-video-camera"></i>
        <div>拖曳影片到此處</div>
        <div class="file-input">
          <label for="file">選擇檔案</label>
          <input type="file" id="file" accept="video/*" @change="onInputChange">
        </div>
        <div style="color: red">影片須小於10MB</div>
      </div>
    </div>
    <video width="320" height="240" controls v-else>
      <source :src="videoLink" type="video/mp4">
    </video>
    <div style="padding:10px">
      <div style="margin-top:10px; margin-bottom: 10px">
        上傳預覽圖片
        <span style="color: red">240 x 240</span>
      </div>
      <div class="choise">
        <label>選擇檔案</label>
        <input type="file" accept="image/*" @change="testfunc">
        <div v-if="test.file" class="text">{{this.test.file["name"]}}</div>
        <div v-else class="text">未選擇任何檔案</div>
      </div>
      <!-- <button class="btn btn-primary" type="button" @click="submit">upLoad!!!!!</button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  name: "videoUpload",
  props: {
    comID: 0,
    realIndex: 0
  },
  data() {
    return {
      loading: false,
      videoLink: "",
      isDragging: false,
      isHadFile: false,
      dragCount: 0,
      files: [],
      images: [],
      imageLink: "",
      test: {
        file: ""
      }
    };
  },
  methods: {
    post2DB() {
      console.log("video post2DB Start");
      var message = {
        type: "video",
        originalContentUrl: this.videoLink,
        previewImageUrl: this.imageLink
      };
      console.log("message");
      console.log(message);
      this.$emit("getJSON", message, this.realIndex);
    },
    testfunc(e) {
      this.test.file = e.target.files[0];
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
        console.log(response.data.data.link);
        this.imageLink = response.data.data.link;
        this.$bus.$emit("vedioPreviewUrlEvent" + this.comID, this.imageLink);
      });
    },

    submit(file) {
      // if (file.size > 10 * 1024 * 1024) {
      //   this.$message.error("影片大小超過上限 10MB !");
      //   this.isHadFile = false;
      //   return;
      // }
      this.loading = true;

      let f = new FormData();
      f.append("file", file);
      // Upload image api
      let token = getToken("Token");
      axios({
        method: "post",
        // url: "https://https://test-backend-dot-flow-263607.appspot.com/video_link",
        url: "http://theflowchat.com:5000/video_link",
        data: f,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": token
        }
        // mimeType: "multipart/form-data"
      }).then(response => {
        console.log(response.data.video_link);
        this.videoLink = response.data.video_link;
        this.$bus.$emit("videoUrlEvent" + this.comID, this.videoLink);
        this.loading = false;
      });
    },

    OnDragEnter(e) {
      e.preventDefault();

      this.dragCount++;
      this.isDragging = true;

      return false;
    },
    OnDragLeave(e) {
      e.preventDefault();
      this.dragCount--;

      if (this.dragCount <= 0) this.isDragging = false;
    },
    onInputChange(e) {
      this.isHadFile = true;
      console.log(e.target.files[0]);
      this.submit(e.target.files[0]);
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isHadFile = true;
      this.isDragging = false;

      const files = e.dataTransfer.files;
      console.log(files);
      this.submit(files[0]);
    },
    getFileSize(size) {
      const fSExt = ["Bytes", "KB", "MB", "GB"];
      let i = 0;

      while (size > 900) {
        size /= 1024;
        i++;
      }

      return `${Math.round(size * 100) / 100} ${fSExt[i]}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.choise {
  width: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  .text {
    position: absolute;
    z-index: 2;
    width: 500px;
    left: 110px;
    top: 15px;
  }
  label,
  input {
    background: #2196f3;
    color: #ffffff;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
    border-radius: 10px;
    z-index: 1;
    cursor: pointer;
    font-size: 20px;
  }

  input {
    opacity: 0;
    z-index: 3;
  }
}
.uploader {
  width: 300px;
  height: 250px;
  background: #fff;
  color: #3d3e3f;

  // padding: 40px 15px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid rgb(255, 0, 0);
  font-size: 15px;
  position: relative;
  overflow: hidden;

  &.dragging {
    background: #3d3e3f;
    color: #fff;

    border: 3px dashed #3d3e3f;

    .file-input label {
      background: #3d3e3f;
      color: #fff;
    }
  }

  &.hadFile {
    border: 3px solid #3d3e3f;
  }

  i {
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .file-input {
    width: 184px;
    margin: auto;
    height: 68px;
    position: relative;

    label,
    input {
      background: rgb(231, 231, 231);
      color: #3d3e3f;
      width: 70%;
      position: absolute;
      left: 23px;
      top: 16px;
      padding: 6px;
      border-radius: 4px;
      margin-top: -1px;
      cursor: pointer;
    }

    input {
      opacity: 0;
      // z-index: -2;
    }
  }

  .images-preview {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0px;

    .img-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      // margin: 10px;
      height: 100%;
      justify-content: space-between;
      background: #fff;
      box-shadow: 5px 5px 20px #3e3737;

      img {
        // max-height: 105px;
        // width: 100%;
        // height: 100%;
        // $var_heigth:heigth;
        // @if ($var_heigth < 150px){
        //   width: 200%;
        // }
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }

    .details {
      font-size: 12px;
      background: #fff;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: self-start;
      padding: 3px 6px;

      .name {
        overflow: hidden;
        height: 18px;
      }
    }
  }

  .upload-control {
    position: absolute;
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    padding: 10px;
    padding-bottom: 4px;
    text-align: right;

    button,
    label {
      background: #3d3e3f;
      border: 2px solid #3d3e3f;
      border-radius: 3px;
      color: #fff;
      font-size: 15px;
      cursor: pointer;
    }

    label {
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
}
video {
  height: auto;
  max-width: 100%;
  border-radius: 15px 15px 15px 15px;
}
</style>