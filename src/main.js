import { createApp } from 'vue'
import App from './App.vue'
import MyIcon from '@/components/MyIcon'

const app = createApp(App)
app.component('MyIcon', MyIcon)

app.mount('#app')
//createApp(App).mount('#app')