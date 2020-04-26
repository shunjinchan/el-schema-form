<template>
  <el-button
    v-if="moveDownButtonAttrs.text"
    v-bind="moveDownButtonAttrs"
    @click="$emit('moveDown')"
  >
    {{ moveDownButtonAttrs.text }}
  </el-button>
  <el-button
    v-else
    v-bind="moveDownButtonAttrs"
    @click="$emit('moveDown')"
  ></el-button>
</template>

<script>
export default {
  props: {
    moveDownButtonAttrs: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
