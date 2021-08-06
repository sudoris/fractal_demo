<template>
  <div>
    <!-- <label>{{ schema.title }}</label> -->
    <input type="text" v-model="val">
  </div>
</template>

<script>


export default {
  name: 'TextInput',

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
