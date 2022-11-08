import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import './styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
