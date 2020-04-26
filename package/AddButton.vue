<template>
  <div class="">
    <el-button
      v-if="addButtonAttrs.text"
      v-bind="addButtonAttrs"
      @click="$emit('add')"
    >
      {{ addButtonAttrs.text }}
    </el-button>
    <el-button v-else v-bind="addButtonAttrs" @click="$emit('add')"></el-button>
  </div>
</template>

<script>
export default {
  props: {
    addButtonAttrs: {
      type: [Object],
      required: true
    }
  }
}
</script>

<style scoped>
div {
  text-align: right;
}
</style>
