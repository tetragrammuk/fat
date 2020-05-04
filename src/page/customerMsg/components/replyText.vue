<template>
  <div class="contain1">{{replyText}}</div>
</template>

<script>
export default {
  name: "replyText",
  props: {
    replyText: ""
  },
  data() {
    return {
      showText: ""
    };
  },
};
</script>

<style scoped>
.contain1 {
  background: rgb(89, 223, 140);
  padding: 10px;
  border-radius: 20px;
  max-width: 260px;
  word-wrap: break-word; 
  /* word-break: break-all; */
  /* height: 10px; */
  /* width: 300px; */
}

</style>