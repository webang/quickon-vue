<template>
  <div class="view">
    <template v-if="richData">
      <div v-html="richData.content"></div>
    </template>
  </div>
</template>

<script>
import apis from '../../apis/index';
export default {
  data() {
    return {
      richData: null
    };
  },
  mounted() {
    this.doGetData();
  },
  methods: {
    doGetData() {
      const id = this.$route.query.id;
      apis.getRichTextDetails(id).then(res => {
        res = res.data;
        if (res.errCode === 0) {
          this.richData = res.data;
        } else {
        }
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.view {
  line-height: 1.5;
  text-align: justify;
}
</style>
