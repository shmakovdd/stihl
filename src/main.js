import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import componentsIcons from '@/components/icons'

const app = createApp(App);

componentsIcons.forEach(component => {
    app.component(component.name, component)
})

app
    .use(router)
    .use(store)
    .mount('#app');
    


