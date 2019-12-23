<template>
  <i class="common-icon" :class="`icon jdfinace  finace-icon-${name} icon-${color} ` " @click="handleClick"
     :style="`fontSize:${size}`">
    <slot/>
    <div v-if="info" class="finace-icon__info">{{ info }}</div>
  </i>
</template>

<script>
export default {
  name: 'CommonIcon',
  props: {
    name: String,
    info: String,
    color: {
      type: String,
      default: '',
      validator (value) {
        return [
          'black',
          'white',
          ''
        ].indexOf(value) > -1
      }
    },
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style>

</style>
