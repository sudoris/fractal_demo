<template>
  <FieldContainer :schema="schema" :value="formData" @input="updateFormData($event)" />    
  <!-- <div>
    Welcome to Fractal

    <div class="split">
      <div class="left">
        <p>Schema:</p>
        <pre>{{prettySchema}}</pre>       
      </div>

      <div class="center">
        <p>Data:</p>
        <pre>{{prettyFormData}}</pre>  
      </div>

      <div class="right">
        <p>The below form was generated using the schema provided:</p>
        <FieldContainer :schema="schema" :value="formData" @input="updateFormData($event)" />    
      </div>
    </div>         
  </div> -->
</template>

<script>
// import FieldContainer from './containers/FieldContainer.vue'

import _cloneDeep from 'lodash/cloneDeep'

// const sampleSchema = {  
//   title: 'My Form',    
//   properties: {
//     name: {
//       title: 'Name',
//       dataType: 'string',
//       fieldType: 'text',    
//     },
//     favoriteFood: {
//       title: 'Favorite Food',
//       dataType: 'string',
//       fieldType: 'text'
//     },
//     favoriteCountry: {
//       title: 'Favorite Country',
//       dataType: 'string',
//       fieldType: 'select',
//       options: ['USA', 'Canada', 'Germany', 'Japan', 'Taiwan'],
//       placeholder: 'Choose favorite country'
//     },
//     // comment: {
//     //   title: 'Comment',
//     //   dataType: 'string',
//     //   fieldType: 'textarea'
//     // },
//     allergies: {
//       title: "Allergies",
//       dataType: 'array',
//       fieldType: 'checkbox',
//       items: [{label: 'Seafood', value: 'seafood'}, {label: 'Peanuts', value: 'peanuts'}, {label: 'Cats', value: 'cats'}]
//     },
//     gender: {
//       title: "Gender",
//       dataType: 'string',
//       fieldType: 'radio',
//       items: [{label: 'Female', value: 0}, {label: 'Male', value: 1}]
//     },
//     contact: {
//       title: 'Contact',            
//       dataType: 'object',
//       fieldType: 'container',       
//       styles: {
//         fieldWrapperStyles: {
//           display: 'flex'          
//         }
//       },        
//       properties: {
//         address: {
//           title: 'Address',
//           dataType: 'string',
//           fieldType: 'text'  
//         },
//         email: {
//           title: 'Email',
//           dataType: 'string',
//           fieldType: 'text'  
//         }           
//       }      
//     }  
//   }
// }

export default {
  name: 'FormLoader',
  // components: {   
  //   FieldContainer
  // },
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
  data() {
    return {
      formData: {},
      // schema: sampleSchema
    }
  },

  created() {    
    this.prepareData()
  },

  computed: {
    // prettySchema() {
    //   return JSON.stringify(this.schema, null, 2);  
    // },

    // prettyFormData() {
    //   return JSON.stringify(this.formData, null, 2);  
    // }
  },

  methods: {   
    updateFormData(newFormData) {
      console.log('emitting updated form data:\n', newFormData)
      this.formData = newFormData
      this.$emit('input', this.formData)
    },

    prepareData() {
      let data = {}
      let schema = this.schema

      if (Object.keys(this.value).length > 0) {
        data = _cloneDeep(this.value)   // use clone deep to prevent overwriting existing data
      }

      let queue = [
        {
          fieldSchema: schema,
          fieldData: data
        }
      ]

      while (queue.length > 0) {
        let { fieldSchema, fieldData } = queue.shift()
        if (fieldSchema.properties) {
          for (let childName in fieldSchema.properties) {
            if (fieldData[childName] === undefined) {
              try {
                switch (fieldSchema.properties[childName].dataType) {
                  case 'object':
                    fieldData[childName] = {}
                    break
                  case 'array':
                    fieldData[childName] = []
                    break
                  default:
                    fieldData[childName] = ''
                }
              } catch (err) {
                console.log('error adding child ', childName, err)
              }
            }          

            if (fieldSchema.properties[childName]) {
              queue.push({
                fieldSchema: fieldSchema.properties[childName],
                fieldData: fieldData[childName]
              })
            }
          }
        }
      }

      this.formData = data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fractal {
  margin-top: 12px;
}

.field {
  margin-bottom: 12px;
}

.split {
  display: flex;
}

.left {
  width: 25%;
}

.center {
  width: 25%;
}

.right {
  width: 50%;
}
</style>
