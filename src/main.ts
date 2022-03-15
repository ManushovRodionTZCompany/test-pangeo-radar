import { createApp } from 'vue'
import BootstrapVue3 from '@/plugins/bootstrap'
import '@/plugins/charjs'

import App from '@/App.vue'

createApp(App).use(BootstrapVue3).mount('#app')
