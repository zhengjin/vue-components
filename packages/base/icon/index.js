import icon from './src/icon'

icon.install = Vue => {
  Vue.component(icon.name, icon)
}

export default icon
