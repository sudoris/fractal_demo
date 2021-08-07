// Plugin export
import Vue from 'vue'
import FormLoader from './components/FormLoader.vue'
// import FieldContainer from './components/containers/FieldContainer.vue'
// import * as fields from './components/fieldsLoader'

const Fractal = {
  // install(Vue) {
  //   const components = {FieldContainer, ...fields}
  //   Vue.component('FormLoader', FormLoader)
  //   function registerField(name) {
  //     Vue.component(name, components[name])
  //   }
  //   for (let component in components) {
  //     registerField(component)
  //   }
  // }  
  FormLoader
}

Vue.component('FormLoader', FormLoader)

export default Fractal
