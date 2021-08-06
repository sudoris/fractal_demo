<template>
  <div>
    <!-- <label>{{schema.title}}</label> -->
    <select v-model="val">
      <option disabled value="">{{schema.placeholder}}</option>
      <option v-for="option in schema.options" :key="option">{{option}}</option>
    </select>
  </div>
</template>

<script>


export default {
  name: 'SelectList',
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
