<template>
  <div>
    <div
      class="uploader"
      @dragenter="OnDragEnter"
      @dragleave="OnDragLeave"
      @dragover.prevent
      @drop="onDrop"
      :class="{ dragging: isDragging, hadFile: isHadFile }"
    >
      <!-- <div class="upload-control" v-show="images.length">
            <label for="file">Select a file</label>
            <button @click="upload">Upload</button>
      </div>-->

      <div
        v-show="!images.length"
        style="display: flex;flex-direction: column; justify-content: center;align-items: center;"
      >
        <i class="el-icon-picture-outline"></i>
        <div>拖曳圖片到此處</div>
        <div class="file-input">
          <label for="file">選擇檔案</label>
          <input type="file" id="file" @change="onInputChange">
        </div>
      </div>

      <div class="images-preview" v-show="images.length">
        <div class="img-wrapper" v-for="(image, index) in images" :key="index">
          <img :src="image" :alt="`Image Uplaoder ${index}`">
          <!-- <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="getFileSize(files[index].size)"></span>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "imageUploader",
  props: {
    comID: 0,
    realIndex: 0
  },
  data() {
    return {
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
      console.log("image post2DB Start");
      var message = {
        type: "image",
        originalContentUrl: this.imageLink,
        previewImageUrl: this.imageLink
      };
      console.log("message");
      console.log(message);
      this.$emit("getJSON", message, this.realIndex);
    },
    submit(file) {
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
        console.log(response.data.data.link);
        this.imageLink = response.data.data.link;
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
      // const files = e.target.files;
      // console.log(files);
      // Array.from(files).forEach(file => this.addImage(file));
      this.isHadFile = true;
      console.log(e.target.files[0]);
      this.addImage(e.target.files[0]);
      this.submit(e.target.files[0]);
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isHadFile = true;
      this.isDragging = false;

      const files = e.dataTransfer.files;
      console.log(files);
      // Array.from(files).forEach(file => this.addImage(file));
      this.addImage(files[0]);
      this.submit(files[0]);
    },
    addImage(file) {
      if (!file.type.match("image.*")) {
        this.$toastr.e(`${file.name} is not an image`);
        return;
      }

      this.files.push(file);

      const img = new Image(),
        reader = new FileReader();

      reader.onload = e => this.images.push(e.target.result);
      // console.log(this.images);
      console.log("sendEvent: " + "imageEvent" + this.comID);
      this.$bus.$emit("imageEvent" + this.comID, this.images);
      reader.readAsDataURL(file);
    },
    getFileSize(size) {
      const fSExt = ["Bytes", "KB", "MB", "GB"];
      let i = 0;

      while (size > 900) {
        size /= 1024;
        i++;
      }

      return `${Math.round(size * 100) / 100} ${fSExt[i]}`;
    },
    upload() {
      const formData = new FormData();

      this.files.forEach(file => {
        formData.append("images[]", file, file.name);
      });

      axios.post("/images-upload", formData).then(response => {
        this.$toastr.s("All images uplaoded successfully");
        this.images = [];
        this.files = [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.uploader {
  width: 300px;
  height: 200px;
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
</style>