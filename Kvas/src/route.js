import {createRouter, createWebHistory} from "vue-router";
import page1 from "./components/page 1.vue";
import page2 from "./components/page 2.vue";
import page3 from "./components/page 3.vue";
import page4 from "./components/page 4.vue";

const routes = [
    {path:"/", component: page1, name:"Page1"},
    {path:"/page2", component: page2, name:"Page2"},
    {path:"/page3", component: page3, name:"Page3"},
    {path:"/page4", component: page4, name:"Page4"}
]

export const router = createRouter({
    history:createWebHistory(),
    routes
})