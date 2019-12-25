<template>
  <div class="home-wrapper">

    <button @click="handleClick">
      redirect view
    </button>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
// import Button from '@/components/Button.vue'
// import Vue from 'vue'
// import {Button} from 'oversea-vue'
// Vue.use(Button)

export default {
  name: 'home',
  components: {
    // Button
  },
  methods: {
    handleClick () {
      this.$router.push({
        path: '/segmentation'
      })
    }
  }
}
</script>

<style scoped>

</style>
