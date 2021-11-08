import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import LogoComponents from 'logo-components'

import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './styles/reset.css'
import 'logo-components/dist/bundle.css'

const app = createApp(App)
app.use(Antd).use(LogoComponents).use(store).use(router).mount('#app')
