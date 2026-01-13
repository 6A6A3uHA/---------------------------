<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Page1 from './components/page 1.vue'
import useUser from './composables/useUser'

const inp = ref('')
const route = useRoute()
const router = useRouter()
</script>

<template>
    <input type="text" v-model="inp">
    <button @click="useUser().addUser(inp), inp=''">Записать</button>
    <div v-for="value,index in useUser().users.valueт">
        <div>{{ value }}</div>
        <button @click="useUser().removeUser(index)">Удалить</button>
    </div>
    <!-- <div>
        <RouterView/>
    </div>
    <div class="down">
        <RouterLink :to="{name:'Page1'}">1</RouterLink>
        <RouterLink :to="{name:'Page2'}">2</RouterLink>
        <RouterLink :to="{name:'Page3'}">3</RouterLink>
        <RouterLink :to="{name:'Page4'}">4</RouterLink>
    </div> -->
    
</template>

<style scoped>
.down{
    bottom: 20px;

}
</style>