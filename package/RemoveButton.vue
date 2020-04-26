<template>
  <el-button
    v-if="removeButtonAttrs.text"
    v-bind="removeButtonAttrs"
    @click="$emit('remove')"
  >
    {{ removeButtonAttrs.text }}
  </el-button>
  <el-button
    v-else
    v-bind="removeButtonAttrs"
    @click="$emit('remove')"
  ></el-button>
</template>

<script>
export default {
  props: {
    removeButtonAttrs: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
