<template>
  <div style="display: flex;flex-direction: row; justify-content: center;">
    <!-- <div class="test" contenteditable="true" role="textbox" spellcheck="false"></div> -->
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="input">
        <el-input
          style="width:300px;"
          @input="doSomethingSpecial"
          v-model="form.input"
          placeholder="請輸入文字"
          maxlength="1500"
          type="textarea"
          :autosize="{ minRows: 2}"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- <el-popover
      placement="bottom"
      title="網址"
      width="200"
      trigger="click"
    >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="input">
        <el-input
          style="width:300px;"
          @input="doSomethingSpecial"
          v-model="form.input"
          placeholder="請輸入文字"
          maxlength="200"
          type="textarea"
          :autosize="{ minRows: 2}"
        ></el-input>
      </el-form-item>
    </el-form>
      <i class="el-icon-link" slot="reference" style="cursor: pointer;"></i>
    </el-popover> -->
  </div>
</template>

<script>
export default {
  name: "addText",
  props: {
    parentInput: "",
    parentInputUrl: "",
    comID: 0,
    realIndex: 0
  },
  methods: {
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
    }
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
      inputUrl: "",
      form: {
        input: "",
        inputTest: ""
      },
      rules: {
        input: [{ validator: inputCheck, trigger: "blur" }],
        inputTest: [{ validator: inputCheck, trigger: "blur" }]
      }
    };
  }
};
</script>

<style scoped>
@import "../width.css";

#my-strictly-unique-vue-upload-multiple-image {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

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
i {
  font-size: 20px;
}
</style>