<template>
  <div style="display: flex;flex-direction: column; justify-content: center;">
    <!-- <div class="test" contenteditable="true" role="textbox" spellcheck="false"></div> -->

    <div class="input-wrapper">
      <div
        maxlength="500"
        class="inputContent"
        id="common_chat_input"
        contenteditable="true"
        @paste.stop="inputContent_paste"
        @drop="inputContent_drop"
        @keydown="inputContent_keydown"
        @mouseup="inputContent_mouseup"
        @mouseleave="inputContent_mouseup"
      >
        <!-- <span> -->
        <div  v-for="(url, index) in urlList" :key="index" class="tag" contenteditable="false">網址0{{url.id+1}}</div>
        <!-- </span> -->
        <!-- <div id="chat_normal"></div> -->
      </div>
    </div>
    <div style="display: flex;flex-direction: row; justify-content: flex-end;">
      <el-dialog
        title="加入網址"
        :visible.sync="linkDialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <p style="text-align: left;padding:5px">URL</p>
        <el-input style="width:300px" v-model="inputUrl" placeholder="請輸網址"></el-input>
        <add-label @transferLabels="parentGetLeabels"></add-label>
        <span slot="footer" class="dialog-footer">
          <el-button @click="linkDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLink">確 定</el-button>
        </span>
      </el-dialog>

      <div class="tool">
        <i class="el-icon-link" @click="linkDialogVisible = true" style="cursor: pointer;"></i>
        <i class="el-icon-user" style="cursor: pointer;"></i>
        <i class="el-icon-basketball" style="cursor: pointer;"></i>
        <i class="el-icon-refresh" style="cursor: pointer;"></i>
      </div>
    </div>
    <el-button @click="testclick">test</el-button>
  </div>
</template>

<script>
import addLabel from "./addLabel";
export default {
  name: "addText",
  props: {
    parentInput: "",
    parentInputUrl: "",
    comID: 0,
    realIndex: 0
  },
  components: {
    addLabel
  },
  data() {
    var inputCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("請輸入訊息，最多200字"));
      } else {
        return callback();
      }
    };
    return {
      inputContent_setTimeout: null, // 输入文字时在输入结束才修改具体内容
      selectionRange: null, // 输入框选中的区域
      shortcutMsgList: [], // 聊天区域的快捷回复列表
      imgViewDialogVisible: false, // 图片查看dialog的显示
      imgViewDialog_imgSrc: "", // 图片查看dialog的图片地址
      inputContent: "",
      inputUrl: "",
      urlList: [],
      urlID:0,
      urlIDList:[],
      urlLimit:5,
      tags: [],
      linkDialogVisible: false,
      form: {
        input: "",
        inputTest: ""
      },
      rules: {
        input: [{ validator: inputCheck, trigger: "blur" }],
        inputTest: [{ validator: inputCheck, trigger: "blur" }]
      }
    };
  },
  methods: {
    testclick() {
      console.log(this.inputContent);
    },
    addLink() {
      this.linkDialogVisible = false;
      var i
      for (i = 0; i < this.urlLimit; i++) {
        if (this.urlIDList.indexOf(i) == -1) {
          this.urlIDList.push(i);
          this.urlID = i;
          this.urlList.push({ url: this.inputUrl, id: this.urlID });
          
          console.log(this.urlList);
          break;
        }
      }
      
      this.inputUrl = "";
    },
    /**
     * 输入框的粘贴
     */
    inputContent_paste: function(e) {
      var self = this;
      var isImage = false;
      if (e.clipboardData && e.clipboardData.items.length > 0) {
        // 1.上传图片
        for (var i = 0; i < e.clipboardData.items.length; i++) {
          var item = e.clipboardData.items[i];
          if (item.kind == "file" && item.type.indexOf("image") >= 0) {
            // 粘贴板为图片类型
            var file = item.getAsFile();
            let formData = new FormData();
            formData.append("uploadFile", file);
            this.$http.uploadFile({
              url: "/upload",
              params: formData,
              successCallback: rs => {
                console.log(file);
                console.log(rs);
                document.getElementById("common_chat_opr_fileUpload").value =
                  "";
                this.sendMsg({
                  contentType: "image",
                  fileName: rs.fileName,
                  fileUrl: rs.fileUrl,
                  state: "success"
                });
              }
            });
            isImage = true;
          }
        }
        // 2.非图片，粘贴纯文本
        if (!isImage) {
          e.stopPropagation();
          e.preventDefault();
          var str = e.clipboardData.getData("text/plain");
          // 转化为纯文字
          var span = document.createElement("span");
          span.innerHTML = str;
          var txt = span.innerText;
          this.setInputDiv(
            txt
              .replace(/\n/g, "")
              .replace(/\r/g, "")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
          );
        }
      }
    },
    /**
     * 输入框的拖拽
     */ inputContent_drop: function(e) {
      var self = this;
      setTimeout(function() {
        self.setInputContentByDiv();
      }, 100);
    },
    /**
     * 输入框的keydown
     */ inputContent_keydown: function(e) {
      this.setInputContentSelectRange();
      var self = this;
      // keyup触发时，绑定的数据还没有被变更，需要进行延后访问
      clearTimeout(this.$data.inputContent_setTimeout);
      this.$data.inputContent_setTimeout = setTimeout(function() {
        self.setInputContentByDiv();
      }, 200);
    },
    /**
     * 输入框的mouseup
     */ inputContent_mouseup: function(e) {
      this.setInputContentSelectRange();
    },
    /**
     * 设置input输入框的选择焦点
     */
    setInputContentSelectRange: function() {
      if (window.getSelection && window.getSelection().rangeCount > 0) {
        var selectRange = window.getSelection().getRangeAt(0);
        if (
          selectRange.commonAncestorContainer.nodeName == "#text" &&
          selectRange.commonAncestorContainer.parentElement &&
          selectRange.commonAncestorContainer.parentElement.id ==
            "common_chat_input"
        ) {
          // 选中了输入框内的文本
          this.$data.selectionRange = selectRange;
        } else if (
          selectRange.commonAncestorContainer.id == "common_chat_input"
        ) {
          // 选中了输入框
          this.$data.selectionRange = selectRange;
        }
      }
    },
    /**
     * 设置输入内容
     * 根据input输入框innerHTML转换为纯文本
     */
    setInputContentByDiv: function() {
      var self = this;
      var htmlStr = document.getElementById("common_chat_input").innerHTML;
      // 1.转换表情为纯文本：<img textanme="[笑]"/> => [笑]
      var tmpInputContent = htmlStr
        .replace(/<img.+text=\"(.+?)\".+>/g, "[$1]")
        .replace(/<.+?>/g, "");
      // 2.设置最长长度
      if (tmpInputContent.length > 500) {
        document.getElementById("common_chat_input").innerHTML = "";
        var value = tmpInputContent
          .substr(0, 499)
          .replace(/\[(.+?)\]/g, function(item, value) {
            return self.$refs.qqemoji.getImgByFaceName(value);
          });
        this.setInputDiv(value);
      }
      // 3.修改store
      this.inputContent = tmpInputContent;
    },
    /**
     * 设置input输入框内容
     * @param {String} vlaue 设置的值
     */
    setInputDiv: function(value) {
      if (this.$data.selectionRange == null) {
        document.getElementById("common_chat_input").focus();
        return;
      }
      // 1.设置selectionRange
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(this.$data.selectionRange);
      } else {
        this.$data.selectionRange && this.$data.selectionRange.select();
      }
      // 2.表情转换为img
      value = this.getqqemojiEmoji(value);
      // 3.聊天框中是否选中了文本，若选中文本将被替换成输入内容
      if (window.getSelection) {
        var sel, range;
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          // 1)删除选中的文本(内容)
          range = sel.getRangeAt(0); // 获取鼠标选中的文本区域
          range.deleteContents(); // 删除选中的文本
          // 2)创建以输入内容为内容的DocumentFragment
          var elemnet;
          if (range.createContextualFragment) {
            elemnet = range.createContextualFragment(value);
          } else {
            // 以下代码等同createContextualFragment
            // 创建一个DocumentFragment
            elemnet = document.createDocumentFragment();
            var divEl = document.createElement("div");
            divEl.innerHTML = value;
            // divEl下的元素，依次插入到DocumentFragment
            for (let i = 0, len = divEl.children.length; i < len; i++) {
              elemnet.appendChild(divEl.firstChild);
            }
          }
          // 3)选中文本的位置替换为新输入的内容，并把光标定位到新内容后方
          var lastNode = elemnet.lastChild;
          range.insertNode(elemnet);
          range.setStartAfter(lastNode);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(imgStr);
      }
      // 4.修改inputContent
      this.setInputContentByDiv();
    },
    /**
     * 转换为QQ表情
     */
    getqqemojiEmoji: function(value) {
      if (value == undefined) {
        return;
      }
      var self = this;
      return value.replace(/\[(.+?)\]/g, function(item, value) {
        return self.$refs.qqemoji.getImgByFaceName(value);
      });
    },
    post2DB() {
      console.log("text post2DB Start");
      var message = {
        type: "text",
        text: this.form.input
      };
      console.log("message");
      console.log(message);
      this.$emit("getJSON", message, this.realIndex);
    },
    doSomethingSpecial() {
      // emit the event and pass with it an object of "event data".
      this.$bus.$emit("textEvent" + this.comID, this.form.input);
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
.input-wrapper {
  // border-style: solid;
  // border-radius: 3px;
  width: 300px;
  // min-height: 50px;
  .inputContent {
    // padding: 2px;
    // height: 20px;
    // resize: none;
    // overflow: auto;
    // line-height: 1.5;
    // outline: 0px solid transparent;
    width: 300px;
    min-height: 40px;
    background: #ffffff;
    outline: none;
    user-select: text;
    overflow-wrap: break-word;
    border: 1px solid #aaaaaa;
    border-radius: 5px 5px 5px 5px;
  }
}
i {
  font-size: 20px;
}
// .test {
//   width: 300px;
//   min-height: 40px;
//   background: #ffffff;
//   outline: none;
//   user-select: text;
//   overflow-wrap: break-word;
//   border: 1px solid #aaaaaa;
//   border-radius: 5px 5px 5px 5px;
// }
.tool {
  background: #000000;
  opacity: 0.8;
  border-radius: 10px 10px 10px 10px;
  i {
    font-size: 25px;
    color: #cecece;
    padding: 5px;
  }
}
.tag {
  background: #9cb7f3;
      font-size: 10px;
  border-radius: 5px 5px 5px 5px;
}
</style>