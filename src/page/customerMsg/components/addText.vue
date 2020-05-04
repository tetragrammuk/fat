<template>
  <div style="display: flex;flex-direction: column; justify-content: center;">
    <!-- <div class="test" contenteditable="true" role="textbox" spellcheck="false"></div> -->

    <div class="input-wrapper">
      <div
        maxlength="1500"
        class="inputContent"
        id="common_chat_input"
        contenteditable="true"
        @paste.stop="inputContent_paste"
        @drop="inputContent_drop"
        @keydown="inputContent_keydown"
        @mouseup="inputContent_mouseup"
        @mouseleave="inputContent_mouseup"
      >
        <!-- <div
          v-for="(url, index) in urlList"
          :key="index"
          class="tag"
          contenteditable="false"
        >網址0{{url.id}}</div>-->
        <!-- <img
          v-for="(link, index) in imgList"
          :key="index+200"
          style="width: 30px; padding:1px;margin-bottom:-8px;"
          :src="link"
        >-->
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
        <!-- <i class="el-icon-user" style="cursor: pointer;"></i> -->
        <el-popover placement="bottom" width="210" trigger="click">
          <el-scrollbar>
            <div style="height: 200px;">
              <img
                v-for="index in 175"
                :key="index"
                style="width: 20%;cursor: pointer;padding:1px;"
                :src="imgSrc + imgTable[index]"
                @click="addEmoji(index)"
              >
            </div>
          </el-scrollbar>
          <i class="el-icon-basketball" slot="reference" style="cursor: pointer;"></i>
        </el-popover>
        <i class="el-icon-refresh" style="cursor: pointer;" @click="refresh"></i>
      </div>
    </div>
    <!-- <el-button @click="testclick">test</el-button> -->
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
      imgSrc: "https://storage.cloud.google.com/line_emoji/",
      imgList: [],
      indexList: [],
      inputContent_setTimeout: null, // 输入文字时在输入结束才修改具体内容
      selectionRange: null, // 输入框选中的区域
      shortcutMsgList: [], // 聊天区域的快捷回复列表
      imgViewDialogVisible: false, // 图片查看dialog的显示
      imgViewDialog_imgSrc: "", // 图片查看dialog的图片地址
      inputContent: "",
      inputUrl: "",
      urlList: [],
      tagList: [],
      urlID: 0,
      urlIDList: [],
      urlCount: 1,
      tags: [],
      linkDialogVisible: false,
      form: {
        input: "",
        inputTest: ""
      },
      rules: {
        input: [{ validator: inputCheck, trigger: "blur" }],
        inputTest: [{ validator: inputCheck, trigger: "blur" }]
      },
      rangeStartOffset: 0,
      textNode: "",
      range: "",
      imgTable: [
        "",
        "0x100078.png",
        "0x100079.png",
        "0x10007A.png",
        "0x10007B.png",
        "0x10007B.png",
        "0x10007B.png",
        "0x10007E.png",
        "0x10008C.png",
        "0x10008D.png",
        "0x10008E.png",
        "0x10008F.png",
        "0x100090.png",
        "0x100091.png",
        "0x100092.png",
        "0x100093.png",
        "0x100094.png",
        "0x100095.png",
        "0x10007F.png",
        "0x100080.png",
        "0x100081.png",
        "0x100082.png",
        "0x100083.png",
        "0x100096.png",
        "0x100097.png",
        "0x100098.png",
        "0x100099.png",
        "0x10009A.png",
        "0x10009B.png",
        "0x10009C.png",
        "0x10009D.png",
        "0x10009E.png",
        "0x100084.png",
        "0x100085.png",
        "0x100086.png",
        "0x100087.png",
        "0x100088.png",
        "0x100089.png",
        "0x10008A.png",
        "0x10008B.png",
        "0x10009F.png",
        "0x100001.png",
        "0x100002.png",
        "0x100003.png",
        "0x100004.png",
        "0x100005.png",
        "0x100006.png",
        "0x100007.png",
        "0x100008.png",
        "0x100009.png",
        "0x10000A.png",
        "0x10000B.png",
        "0x10000C.png",
        "0x10000D.png",
        "0x10000E.png",
        "0x10000F.png",
        "0x100010.png",
        "0x100011.png",
        "0x100012.png",
        "0x100013.png",
        "0x100014.png",
        "0x100015.png",
        "0x100016.png",
        "0x100017.png",
        "0x100018.png",
        "0x100019.png",
        "0x10001A.png",
        "0x10001B.png",
        "0x10001C.png",
        "0x10001D.png",
        "0x10001E.png",
        "0x10001F.png",
        "0x100020.png",
        "0x100021.png",
        "0x100022.png",
        "0x100023.png",
        "0x10005D.png",
        "0x10005F.png",
        "0x10005E.png",
        "0x1000A0.png",
        "0x1000A1.png",
        "0x100024.png",
        "0x1000A2.png",
        "0x1000A3.png",
        "0x1000A4.png",
        "0x1000A5.png",
        "0x1000A6.png",
        "0x1000A7.png",
        "0x100026.png",
        "0x100027.png",
        "0x100029.png",
        "0x10002A.png",
        "0x10002B.png",
        "0x10002C.png",
        "0x10002D.png",
        "0x10002E.png",
        "0x10002F.png",
        "0x10003A.png",
        "0x1000A8.png",
        "0x1000A9.png",
        "0x1000AA.png",
        "0x1000AB.png",
        "0x1000AC.png",
        "0x100033.png",
        "0x1000AD.png",
        "0x100030.png",
        "0x100031.png",
        "0x100032.png",
        "0x1000AE.png",
        "0x100035.png",
        "0x100036.png",
        "0x100039.png",
        "0x100037.png",
        "0x100038.png",
        "0x1000AF.png",
        "0x1000B0.png",
        "0x1000B1.png",
        "0x1000B2.png",
        "0x1000B3.png",
        "0x10003B.png",
        "0x10003C.png",
        "0x10003D.png",
        "0x1000B4.png",
        "0x100040.png",
        "0x100041.png",
        "0x100042.png",
        "0x100043.png",
        "0x100044.png",
        "0x100045.png",
        "0x1000B5.png",
        "0x100047.png",
        "0x100049.png",
        "0x10004A.png",
        "0x10004B.png",
        "0x10004C.png",
        "0x10004D.png",
        "0x10004E.png",
        "0x10004F.png",
        "0x100050.png",
        "0x100051.png",
        "0x100053.png",
        "0x100054.png",
        "0x100055.png",
        "0x100056.png",
        "0x1000B6.png",
        "0x100057.png",
        "0x100058.png",
        "0x100059.png",
        "0x1000B7.png",
        "0x10005B.png",
        "0x10005C.png",
        "0x100060.png",
        "0x100061.png",
        "0x100062.png",
        "0x1000B8.png",
        "0x1000B9.png",
        "0x100064.png",
        "0x100065.png",
        "0x100066.png",
        "0x100067.png",
        "0x100068.png",
        "0x100069.png",
        "0x10006A.png",
        "0x10006B.png",
        "0x10006C.png",
        "0x10006D.png",
        "0x10006E.png",
        "0x10006F.png",
        "0x100070.png",
        "0x100071.png",
        "0x100072.png",
        "0x100073.png",
        "0x100074.png",
        "0x100075.png",
        "0x100076.png",
        "0x100077.png"
      ]
    };
  },
  methods: {
    refresh() {
      this.inputContent = "";
      document.getElementById("common_chat_input").innerHTML = "";
      this.$bus.$emit("textEvent" + this.comID, "");
      this.urlList = [];
      this.tagList = [];
    },
    getInputPosition() {
      var sel, range, rangeStartOffset, textNode;
      sel = window.getSelection();
      range = sel.getRangeAt(0); // 获取鼠标选中的文本区域
      (this.rangeStartOffset = range.startOffset), // 获取光标位置
        (this.textNode = range.startContainer);
      this.range = range;
      // console.log(this.textNode);
    },
    testclick() {
      this.setInputContentByDiv();
      console.log(this.inputContent);
      console.log(this.urlList);
      console.log(this.tagList);
      console.log(this.rangeStartOffset);
      console.log(this.textNode);
    },
    addEmoji(index) {
      // if (this.rangeStartOffset) {
      //   this.textNode.insertData(this.rangeStartOffset, "___emoji___");
      // } else {
      //   if (
      //     document
      //       .getElementById("common_chat_input")
      //       .innerHTML.indexOf("<br>") != -1
      //   ) {
      //     let htmlStr = document
      //       .getElementById("common_chat_input")
      //       .innerHTML.replace("<br>", "___emoji___");
      //     document.getElementById("common_chat_input").innerHTML = htmlStr;
      //   } else {
        
      var emojiReplace = "___emoji___";
      this.setInputDiv(
        emojiReplace
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;"),
        this.range
      );
      //   }
      // }
      var tmpLink =
        "https://storage.cloud.google.com/line_emoji/" + this.imgTable[index];
      var imgHTMLstr =
        '<img style="width: 30px;margin-bottom:-8px;" src="' +
        tmpLink +
        '" >';
      var htmlStr = document
        .getElementById("common_chat_input")
        .innerHTML.replace("___emoji___", imgHTMLstr);
      document.getElementById("common_chat_input").innerHTML = htmlStr;
      this.$bus.$emit("textEvent" + this.comID, htmlStr);
    },
    addLink() {
      this.linkDialogVisible = false;

      // if (this.rangeStartOffset) {
      //   this.textNode.insertData(this.rangeStartOffset, "___url___");
      // } else {
      //   if (
      //     document
      //       .getElementById("common_chat_input")
      //       .innerHTML.indexOf("<br>") != -1
      //   ) {
      //     let htmlStr = document
      //       .getElementById("common_chat_input")
      //       .innerHTML.replace("<br>", "___url___");
      //     document.getElementById("common_chat_input").innerHTML = htmlStr;
      //   } else {
      var emojiReplace = "___url___";
      this.setInputDiv(
        emojiReplace
          .replace(/\n/g, "")
          .replace(/\r/g, "")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;"),
        this.range
      );
      //   }
      // }

      var divHTMLstr =
        '<div class="tag" style="background: #9cb7f3;" contenteditable="false" >網址#' +
        this.urlCount +
        "#</div>";
      this.urlList[this.urlCount] = this.inputUrl;
      this.tagList[this.urlCount] = JSON.parse(JSON.stringify(this.tags));
      this.urlCount++;
      // var urlReplace = "___url___";
      // this.setInputDiv(
      //   urlReplace
      //     .replace(/\n/g, "")
      //     .replace(/\r/g, "")
      //     .replace(/</g, "&lt;")
      //     .replace(/>/g, "&gt;")
      // );
      var htmlStr = document
        .getElementById("common_chat_input")
        .innerHTML.replace("___url___", divHTMLstr);
      document.getElementById("common_chat_input").innerHTML = htmlStr;
      console.log(htmlStr);
      this.$bus.$emit("textEvent" + this.comID, htmlStr);

      // this.linkDialogVisible = false;

      // this.urlID = this.urlCount++;
      // this.urlList.push({ url: this.inputUrl, id: this.urlID });

      // console.log(this.urlList);

      // this.inputUrl = "";
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
      this.getInputPosition();
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
      this.getInputPosition();
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
      this.$bus.$emit("textEvent" + this.comID, htmlStr);
      // 1.转换表情为纯文本：<img textanme="[笑]"/> => [笑]
      var tmpInputContent = htmlStr
        .replace(/<img.+text=\"(.+?)\".+>/g, "[$1]")
        .replace(/<div><br><\/div>/g, "\\n")
        .replace(/<div class=\"tag\".+?網址#/g, "__url__")
        .replace(/#<\/div>/g, "__url__")
        .replace(/<img.+?0x1000/g, "\\uDBC0\\uDC")
        .replace(/.png.+?>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/<div>/g, "\\n")
        .replace(/<\/div>/g, "")
        .replace(/<br>/g,"")
        .replace(/%/g,"%%");
      // .replace(/<.+?>/g, "");
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
    setInputDiv: function(value, r) {
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
          if (r) {
            range = r;
          } else {
            range = sel.getRangeAt(0); // 获取鼠标选中的文本区域
          }
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
      this.setInputContentByDiv();
      var message = {
        type: "text",
        text: this.inputContent,
        urlList: this.urlList,
        tagList: this.tagList,
        htmlStr: document
          .getElementById("common_chat_input")
          .innerHTML.replace(/\"/g, '\\"')
          .replace(/%/g, '%%')
        // "464<img style=\\\"width: 30px;margin-bottom:-8px;\\\" src = \\\"https://storage.cloud.google.com/line_emoji/0x10007A.png\\\">&nbsp;"
        //document.getElementById("common_chat_input").innerHTML
      };
      console.log("message");
      console.log(message);
      this.$emit("getJSON", message, this.realIndex);
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
  border-radius: 2px;
}
.test {
  width: 300px;
  min-height: 40px;
  background: #ffffff;
  outline: none;
  user-select: text;
  overflow-wrap: break-word;
  border: 1px solid #aaaaaa;
  border-radius: 5px 5px 5px 5px;
}
</style>