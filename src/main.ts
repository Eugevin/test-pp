import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import './styles.css'
import App from './App.vue'

const pinia = createPinia();
createApp(App).use(pinia).mount('#app')

// * SAVE PINIA STORE TO LOCALSTORAGE
watch(
  pinia.state,
  (state) => {
    localStorage.setItem('store', JSON.stringify(state));
  },
  { deep: true }
);
