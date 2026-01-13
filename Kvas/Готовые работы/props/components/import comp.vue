<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({text: Array})
const emit = defineEmits(['eventA'])
function addEl() {
    emit('eventA')}
const a = reactive({inp:""})
</script>

<template>
    <input type="text" v-model="a.inp">
    <button @click="$emit('eventA', a)"> Тык</button>
    <li v-for="value in props.text">
        {{ value }}
    </li>
</template>

<style scoped>
</style>