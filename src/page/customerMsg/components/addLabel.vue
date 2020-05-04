<template>
  <div>
    <el-popover placement="bottom-start" title="標籤" width="200" v-model="visibleLabel">
      <el-select v-model="labels" multiple placeholder="請選擇標籤" @change="sendParent">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label_name"
          :value="index"
        ></el-option>
      </el-select>
      <div style="text-align: right; margin: 5px">
        <el-button type="primary" size="mini" @click="visibleLabel = false">確認</el-button>
      </div>
      <el-button @click="queryLabels" type="text" slot="reference">+新增標籤</el-button>
    </el-popover>
    <div>
      <el-tag style="margin-right:5px" v-for="tag in labels" :key="tag" closable @close="handleClose(tag)">{{options[tag].label_name}}</el-tag>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from '@/utils/auth' ; 

export default {
  name: "addLabel",
  data() {
    return {
      APIbaseURL: "https://test-backend-dot-flow-263607.appspot.com",
      visibleLabel: false,
      options: [],
      labels: [],
      label_ids: [],
      value2: []
    };
  },
  methods: {
    queryLabels() {
      let token = getToken('Token');
      axios({
        method: "post",
        baseURL: this.APIbaseURL,
        url: "/push_msg_tag",
        headers: {
          "Content-Type": "application/json",
          'x-access-token': token
        }
      }).then(response => {
        console.log(response);
        this.options = response.data.data;
      });
    },
    handleClose(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },
    sendParent(){
      var i;
      for(i = 0;i < this.labels.length;i++){
        this.label_ids[i] = this.options[this.labels[i]].label_id;
      }
        //console.log(this.label_ids);
      this.$emit("transferLabels", this.label_ids);
    }
  }
};
</script>

<style scoped>
@import "../width.css";

</style>