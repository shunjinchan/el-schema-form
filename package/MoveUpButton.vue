<template>
  <el-button
    v-if="moveUpButtonAttrs.text"
    v-bind="moveUpButtonAttrs"
    @click="$emit('moveUp')"
  >
    {{ moveUpButtonAttrs.text }}
  </el-button>
  <el-button
    v-else
    v-bind="moveUpButtonAttrs"
    @click="$emit('moveUp')"
  ></el-button>
</template>

<script>
export default {
  props: {
    moveUpButtonAttrs: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
