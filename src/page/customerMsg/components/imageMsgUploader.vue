<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="通知訊息" prop="input">
        <el-input
          style="width:300px;"
          v-model="form.input"
          placeholder="請輸入文字"
          maxlength="100"
        ></el-input>
      </el-form-item>
    </el-form>

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
        <div style="color: red">圖片須為1040 x 1040</div>
      </div>
      <div class="images-preview" v-show="images.length">
        <div class="img-wrapper" v-for="(image, index) in images" :key="index">
          <el-tooltip v-model="showPrompt" :manual="true" content="請 框 取 點 擊 範 圍" placement="top">
            <img :src="image" :alt="`Image Uplaoder ${index}`">
          </el-tooltip>
          <!-- <div class="details">
                    <span class="name" v-text="files[index].name"></span>
                    <span class="size" v-text="getFileSize(files[index].size)"></span>
          </div>-->
        </div>
      </div>
      <div
        class="clickbox"
        v-for="(item, index) in rect"
        :key="index+50"
        :style="item.style"
        @click="item.visible = true"
      >
        <i class="el-icon-error" @click="cancelRect(index)"></i>
      </div>
      <el-dialog
        title="點擊設定"
        :visible.sync="item.visible"
        width="30%"
        :before-close="handleClose"
        v-for="(item, index) in rect"
        :key="index"
      >
        <div
          style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
        >
          <div
            style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;padding:5px"
          >
            <p style="padding:5px">互動區塊</p>
            <el-radio style="padding:5px" v-model="item.radio" label="1">發送訊息</el-radio>
            <el-radio style="padding:5px" v-model="item.radio" label="2">開啟網頁</el-radio>
          </div>
          <div v-if="item.radio =='1'" style="padding:5px">
            <p style="text-align: left;padding:5px">訊息</p>
            <el-input
              style="width:300px"
              maxlength="30"
              show-word-limit
              v-model="item.text"
              placeholder="請輸訊息"
              type="textarea"
            ></el-input>
          </div>
          <div v-if="item.radio =='2'" style="padding:5px">
            <p style="text-align: left;padding:5px">URL</p>
            <el-input style="width:300px" v-model="item.URL" placeholder="請輸網址"></el-input>
            <add-label @transferLabels="parentGetLeabels"></add-label>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="item.visible = false">取 消</el-button>
          <el-button type="primary" @click="save(index)">確 定</el-button>
        </span>
      </el-dialog>
      <canvas
        class="canvas"
        @mousedown="onCanvasMouseDown"
        @mouseup="onCanvasMouseUp"
        @mousemove="onCanvasMouseMove"
        ref="sketchpad"
      ></canvas>
    </div>
    <!-- <el-button @click="testclick">test</el-button> -->
  </div>
</template>

<script>
import axios from "axios";
import addLabel from "./addLabel";
export default {
  name: "imageUploader",
  props: {
    realIndex: 0,
    comID: 0
  },
  components: {
    addLabel
  },

  data() {
    var inputCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入訊息，最多100字"));
      } else {
        return callback();
      }
    };

    return {
      showPrompt: false,
      canvasContext: {},
      rect: [], //{style, visible}
      tempPosition: null,
      tempCanvas: null,
      isCanvasMouseDown: false,
      drawing: false,
      isDragging: false,
      isHadFile: false,
      dragCount: 0,
      files: [],
      images: [],
      imageLink: "",
      tags: [],
      test: {
        file: ""
      },
      form: {
        input: ""
      },
      rules: {
        input: [{ validator: inputCheck, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.setCanvas();
  },
  methods: {
    testclick() {},
    save(index) {
      this.rect[index].visible = false;
      this.$bus.$emit("imageMsgClickRectEvent" + this.comID, this.rect);
    },
    cancelRect(index) {
      this.rect.splice(index, 1);
      this.$bus.$emit("imageMsgClickRectEvent" + this.comID, this.rect);
    },
    setCanvas() {
      let canvas = this.$refs["sketchpad"];
      canvas.width = 400;
      canvas.height = 400;
      let ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      this.canvasContext = ctx;
    },
    post2DB() {
      //todo
      console.log("imageMsg post2DB Start");
      var message = {
        type: "imagemap",
        altText: this.form.input,
        baseUrl: this.imageLink,
        baseSize: {
          width: 1040,
          height: 1040
        },
        actions: []
      };
      var i;
      for (i = 0; i < this.rect.length; i++) {
        if (this.rect[i].radio == "1") {
          message.actions[i] = {
            type: "message",
            text: this.rect[i].text,
            area: {
              x: (this.rect[i].position.x / 400) * 1040,
              y: (this.rect[i].position.y / 400) * 1040,
              width: (this.rect[i].position.width / 400) * 1040,
              height: (this.rect[i].position.height / 400) * 1040
            },
            label_id: []
          };
        } else {
          message.actions[i] = {
            type: "uri",
            linkUri: this.rect[i].URL,
            area: {
              x: (this.rect[i].position.x / 400) * 1040,
              y: (this.rect[i].position.y / 400) * 1040,
              width: (this.rect[i].position.width / 400) * 1040,
              height: (this.rect[i].position.height / 400) * 1040
            },
            label_id: this.tags
          };
        }
      }

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
      // if (!file.type.match("image.*")) {
      //   this.$toastr.e(`${file.name} is not an image`);
      //   return;
      // }

      this.files.push(file);

      const img = new Image(),
        reader = new FileReader();

      reader.onload = e => this.images.push(e.target.result);
      // console.log(this.images);
      console.log("sendEvent: " + "imageMsgEvent" + this.comID);
      this.$bus.$emit("imageMsgEvent" + this.comID, this.images);
      reader.readAsDataURL(file);
      this.drawing = true;
      this.showPrompt = true;
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
    },
    onCanvasMouseDown(event) {
      if (this.drawing == true) {
        this.isCanvasMouseDown = true;
        this.setTempCanvas();
        let currentPos = this.getCanvasMousePosition(
          event.clientX,
          event.clientY
        );
        this.setCanvasTempPosition(currentPos.x, currentPos.y);
      }
    },
    onCanvasMouseUp(event) {
      if (this.drawing == true) {
        this.isCanvasMouseDown = false;
        let currentPos = this.getCanvasMousePosition(
          event.clientX,
          event.clientY
        );
        var position = {
          x: this.tempPosition.x,
          y: this.tempPosition.y,
          width: currentPos.x - this.tempPosition.x,
          height: currentPos.y - this.tempPosition.y
        };
        if (position.width < 0) {
          position.width = 0 - position.width;
          position.x -= position.width;
        }
        if (position.height < 0) {
          position.height = 0 - position.height;
          position.y -= position.height;
        }
        if (position.width < 30 || position.height < 30) {
          this.$message.error("選取範圍過小");
          this.canvasContext.putImageData(this.tempCanvas, 0, 0);
          return;
        }
        var styleUnit = {
          left: position.x.toString() + "px",
          top: position.y.toString() + "px",
          width: position.width.toString() + "px",
          height: position.height.toString() + "px"
        };
        var rectUnit = {};
        rectUnit.position = position;
        rectUnit.style = styleUnit;
        rectUnit.visible = false;
        rectUnit.radio = "1";
        rectUnit.text = "";
        rectUnit.URL = "";
        this.rect.push(rectUnit);
        console.log(this.rect);
        this.canvasContext.putImageData(this.tempCanvas, 0, 0);
        this.$bus.$emit("imageMsgClickRectEvent" + this.comID, this.rect);
      }
    },
    onCanvasMouseMove(event) {
      if (this.isCanvasMouseDown == true && this.drawing == true) {
        let currentPos = this.getCanvasMousePosition(
          event.clientX,
          event.clientY
        );
        // this.setCanvasTempPosition(currentPos.x, currentPos.y);
        let ctx = this.canvasContext;
        ctx.beginPath();
        ctx.lineWidth = this.currentSize * 2;
        ctx.strokeStyle = "#04ce2f";
        // ctx.fillStyle  = "#04ce2f";

        let tempx = this.tempPosition.x;
        let tempy = this.tempPosition.y;
        let width = currentPos.x - tempx;
        let height = currentPos.y - tempy;
        ctx.putImageData(this.tempCanvas, 0, 0);
        ctx.rect(tempx, tempy, width, height);

        ctx.stroke();
      }
    },
    getCanvasMousePosition(clientX, clientY) {
      let canvasPosition = this.canvasContext.canvas.getBoundingClientRect();
      let x = clientX - canvasPosition.x;
      let y = clientY - canvasPosition.y;
      return { x, y };
    },
    setCanvasTempPosition(x, y) {
      this.tempPosition = { x, y };
    },
    setTempCanvas() {
      let ctx = this.canvasContext;
      let canvas = ctx.canvas;
      let tempCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.tempCanvas = tempCanvas;
    },
    handleClose(done) {
      this.$confirm("確認關閉?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    parentGetLeabels(labels) {
      this.tags = labels;
      // console.log("button.tags: " + this.button.tags);
    }
  }
};
</script>

<style lang="scss" scoped>
.clickbox {
  // display: flex;
  // flex-direction: row;
  // justify-content: flex-end;
  // align-items: flex-end;
  position: absolute;
  background: rgb(77, 255, 121);
  border: 2px solid #04ce2f;
  opacity: 0.3;
  z-index: 6;
  cursor: pointer;
  .el-icon-error {
    font-size: 25px;
    margin-top: 0;
    margin-bottom: 0;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
  }
}
.clickbox:hover {
  opacity: 0.5;
  .el-icon-error {
    opacity: 0.8;
  }
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.uploader {
  width: 404px;
  height: 404px;
  background: #fff;
  color: #3d3f3d;
  // padding: 40px 15px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid rgb(255, 0, 0);
  font-size: 20px;
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
    font-size: 40px;
    margin-top: 70px;
    margin-bottom: 30px;
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
      z-index: 12;
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