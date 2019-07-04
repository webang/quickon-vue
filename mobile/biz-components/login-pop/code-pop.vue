<template>
  <div class="code-pop" v-if="url">
    <div class="body">
      <span class="btn-close">X</span>
      <div class="form-item">
        <van-field class="code-field" v-model="imgCode" placeholder="短信验证码" />
        <img :src="url" alt />
      </div>
      <van-button
        class="code-btn"
        :disabled="!imgCode.length"
        type="primary"
        @click="handleClick"
        block
      >确认</van-button>
    </div>
  </div>
</template>

<script>
import { Field, Button, CellGroup, Cell, Toast } from 'vant';
export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button
  },
  props: {
    url: ''
  },
  data() {
    return {
      imgCode: ''
    };
  },
  methods: {
    handleClick() {
      this.$emit('confirm', this.imgCode);
    }
  }
};
</script>

<style lang="postcss" scoped>
.code-pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: table;
}

.body {
  /* position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0; */
  margin: auto;
  width: 300px;
  padding: 20px;
  background: #fff;
  margin-top: 40%;
}

.form-item {
  overflow: hidden;
  border: 1px solid #f4f4f4;
}

.code-field {
  float: left;
  width: 180px;
}

.code-btn {
  margin-top: 20px;
}

img {
  float: left;
  width: 110px;
  height: 40px;
}
</style>
