<template>
  <div>
    <div class="container">
      <label class="section-title">{{schema.title}}</label>
      <div :style="fieldWrapperStyles">
        <template v-for="(fieldSchema, key) in schema.properties">          
          <div class="field" v-if="fieldSchema.items" :key="key">
            <label>{{fieldSchema.title}}</label>
            <component 
              v-for="item in fieldSchema.items"
              :is="getFieldName(fieldSchema)" 
              :key="item.value" 
              :schema="fieldSchema" 
              :item="item"
              :value="value[key]"
              @input="emitChange($event, value, key)"
              :selfKey="item.value">
            </component>       
          </div>  
          <div class="field" v-else :key="key">
            <label v-if="fieldSchema.dataType !== 'object'">{{fieldSchema.title}}</label>
            <component         
              :is="getFieldName(fieldSchema)"           
              :schema="fieldSchema" 
              class="field" 
              :value="value[key]"
              @input="emitChange($event, value, key)"
              :selfKey="key">
            </component>
          </div>     
        </template>   
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../fields/TextInput.vue'
import TextArea from '../fields/TextArea.vue'
import RadioInput from '../fields/RadioInput.vue'
import SelectList from '../fields/SelectList.vue'
import Checkbox from '../fields/Checkbox.vue'
import FieldContainer from './FieldContainer.vue'

export default {
  name: 'FieldContainer',
  components: {
    TextInput,
    TextArea,
    FieldContainer,
    RadioInput,
    SelectList,
    Checkbox
  },  
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  provide: {
    isFormRoot: false
  },  
  inject: {
    isFormRoot: { default: true }
  },
  data() {
    return {
     isRootContainer: false
    }
  },

  created() {
  },

  computed: {
    // val: {
    //   get() {
    //     return this.formData
    //   },
    //   set(newVal) {
    //     console.log('container received val changed', newVal)
    //     this.$emit('input', newVal)
    //   }
    // },
    fieldWrapperStyles() {
      let styles = ''

      if (this.schema.styles && this.schema.styles.fieldWrapperStyles) {
        styles = this.schema.styles.fieldWrapperStyles
      }

      return styles
    },
    // containerStylesOuter() {
    //   let styles = ''

    //   if (this.schema.styles && this.schema.styles.containerStylesOuter) {
    //     styles = this.schema.styles.containerStylesOuter
    //   }

    //   return styles
    // },
    // containerStylesInner() {
    //   let styles = ''

    //   if (this.schema.styles && this.schema.styles.containerStylesInner) {
    //     styles = this.schema.styles.containerStylesInner
    //   }

    //   return styles
    // }
  },

  methods: {
    getFieldName(fieldSchema) {
      const fieldTypeMap = {
        text: 'TextInput',
        textarea: 'TextArea',
        container: 'FieldContainer',
        radio: 'RadioInput',
        select: 'SelectList',
        checkbox: 'Checkbox'
      }

      return fieldTypeMap[fieldSchema.fieldType]
    },

    emitChange(val, value, key) {
      console.log('field container triggered')
      value[key] = val
      this.$emit('input', value, key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 12px;
  border: 1px solid red;
}

.section-title {
  font-size: 18px;
  font-weight: bolder;
  margin: 0 8px 8px 0;
  display: inline-block;
}

.field{
  margin: 0 8px 8px 0;
}
</style>
