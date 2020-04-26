<template>
  <div class="el-schema-form-item-tool-bar">
    <move-up-button
      v-if="isOrderable"
      :move-up-button-attrs="moveUpButtonAttrs"
      @moveUp="
        () => {
          !moveUpButtonDisabled && $emit('move-up', fieldsetSchema, index);
        }
      "
    ></move-up-button>
    <move-down-button
      v-if="isOrderable"
      :move-down-button-attrs="moveDownButtonAttrs"
      @moveDown="
        () => {
          !moveDownButtonDisabled &&
            $emit('move-down', fieldsetSchema, index);
        }
      "
    ></move-down-button>
    <remove-button
      v-if="isRemovable && !removeButtonDisabled"
      :remove-button-attrs="removeButtonAttrs"
      @remove="
        () => {
          !removeButtonDisabled &&
            $emit('remove-field', fieldsetSchema, index);
        }
      "
    ></remove-button>
  </div>
</template>

<script>
import RemoveButton from './RemoveButton.vue'
import MoveUpButton from './MoveUpButton.vue'
import MoveDownButton from './MoveDownButton.vue'

export default {
  components: {
    RemoveButton,
    MoveUpButton,
    MoveDownButton
  },

  props: [
    'isOrderable',
    'moveUpButtonDisabled',
    'schema',
    'fieldsetSchema',
    'index',
    'moveUpButtonAttrs',
    'moveDownButtonDisabled',
    'moveDownButtonAttrs',
    'isRemovable',
    'removeButtonDisabled',
    'removeButtonAttrs',
    'isFieldset'
  ],

  data () {
    return {
    }
  }
}
</script>

<style></style>
