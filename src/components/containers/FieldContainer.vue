<template>
  <div v-if="isReady" class="f-container">
    <label class="f-section-title">{{schema.title}}</label>
    <div :style="fieldWrapperStyles">
      <template v-for="(fieldSchema, key) in schema.properties">          
        <div class="f-field" v-if="fieldSchema.items" :key="key">
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
        <div class="f-field" v-else :key="key">
          <label v-if="fieldSchema.dataType !== 'object'">{{fieldSchema.title}}</label>
          <component         
            :is="getFieldName(fieldSchema)"           
            :schema="fieldSchema"             
            :value="value[key]"
            @input="emitChange($event, value, key)"
            :selfKey="key">
          </component>
        </div>     
      </template>   
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
  // Only the first FieldContainer will have a value of true for isRootFormContainer  
  provide: {
    isRootFormContainer: false
  },  
  inject: {
    isRootFormContainer: { default: true }
  },
  data() {
    return {
     isRootFormContainer: false,    

     // Use isReady to wait for certain conditions to be met before loading the form 
     // Ex: wait for validation of schema/building of form data object before loading form elements
     isReady: false  
    }
  }, 

  created() {
    this.isReady = true
  },

  computed: {    
    fieldWrapperStyles() {
      let styles = ''

      if (this.schema.styles && this.schema.styles.fieldWrapperStyles) {
        styles = this.schema.styles.fieldWrapperStyles
      }

      return styles
    }    
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

<style scoped>
.f-container {
  padding: 8px;
  border: 1px solid grey;
}

.f-section-title {
  font-size: 18px;
  font-weight: bolder;
  margin: 0 8px 8px 0;
  display: inline-block;
}

.f-field{
  margin: 0 8px 8px 0;
}
</style>
