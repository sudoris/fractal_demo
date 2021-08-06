<template>
  <div>    
    <textarea rows="5" cols="33" placeholder="Write anything..." v-model="val"></textarea>
  </div>
</template>

<script>


export default {
  name: 'TextArea',
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },

    value: {
      default() {
        return null
      }
    }
  },

  data() {
    return {
     
    }
  },

  computed: {
    val: {
      get() {
        return this.value
      },
      set(newVal) {
        console.log('val changed in field', newVal)
        this.$emit('input', newVal)
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
