import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './directives/reveal'
import { vTilt } from './directives/tilt'
import { i18n } from './i18n'
import router from './router'
import '@fontsource-variable/montserrat'
import './styles/main.css'

createApp(App)
  .use(router)
  .use(i18n)
  .directive('reveal', vReveal)
  .directive('tilt', vTilt)
  .mount('#app')
