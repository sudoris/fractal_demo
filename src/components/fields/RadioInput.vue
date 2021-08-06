<template>
  <div>
    <input type="radio" :id="item.value" :value="item.value" v-model="val">
    <label :for="item.value">{{item.label}}</label>
  </div>
</template>
<script>


export default {
  name: 'RadioInput',
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },

    item: {
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
