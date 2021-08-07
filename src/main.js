// Plugin export
import Vue from 'vue'
import Fractal from './components/Fractal.vue'
// import FieldContainer from './components/containers/FieldContainer.vue'
// import * as fields from './components/fieldsLoader'

// const Fractal = {
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
//   FormLoader
// }

Vue.component('Fractal', Fractal)

export default Fractal
