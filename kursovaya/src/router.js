import { createRouter, createWebHistory } from "vue-router";
import home from './components/home.vue'
import catalog from "./components/catalog.vue";
import cart from "./components/cart.vue";
import log_in from "./components/log_in.vue";
import sign_in from "./components/sign_in.vue";
import page_product from "./components/page_product.vue";
import about from "./components/about.vue";



const routes = [
    {path:'/', component: home, name:'home'},
    {path:'/Каталог товаров', component: catalog, name:'catalog'},
    {path:'/Корзина', component: cart, name:'cart'},
    {path:'/Вход', component: log_in, name:'log_in'},
    {path:'/Регистрация', component: sign_in, name:'sign_in'},
    {path:`/${"пока что просто текст, позже добавить переменную из export default или defineModel для отображения действительного товара"}`, component: page_product, name:'page_product'},
    {path:'/О нас', component: about, name:'about'}
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to, from, next)=>{
    if (to.matched.length===0) {
        const decoded = decodeURIComponent(to.path)
        if (decoded!==to.path) 
            {next(decoded)}
        else
            {next('/')}
    }
    else{next()}    
})
 
export {router}