<template>
  <button
    :type="nativeType"
    class="common-button"
    :class="['common-button--' + type, 'common-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]"
    @click="handleClick"
    :disabled="disabled">
    <span class="common-button-icon" v-if="icon || $slots.icon">
      <icon :name="icon" :color="color" size=".4rem"/>
    </span>
    <label class="common-button-text">
      <slot></slot>
    </label>
  </button>
</template>

<script>
/**
   * header
   * @module components/button
   * @desc 按钮
   * @param {string} [type=default] - 显示类型，接受 default, primary, danger
   * @param {boolean} [disabled=false] - 禁用
   * @param {boolean} [plain=false] - 幽灵按钮
   * @param {string} [size=normal] - 尺寸，接受 normal, small, large
   * @param {string} [native-type] - 原生 type 属性
   * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .commonui-xxx）
   * @param {slot} - 显示文本
   * @param {slot} [icon] 显示图标
   *
   * @example
   * <common-button size="large" icon="back" type="primary">按钮</common-button>
   */
import icon from '../../icon/src/icon'

export default {
  name: 'CommonButton',

  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  },
  components: {icon},
  props: {
    icon: String,
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'default',
          'danger',
          'primary'
        ].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1
      }
    },
    color: {
      type: String,
      default: 'white',
      validator (value) {
        return [
          'black',
          'white'
        ].indexOf(value) > -1
      }
    },
    height: {
      type: String,
      default: '1rem'
    }
  }
}
</script>

<style lang="css">

</style>
