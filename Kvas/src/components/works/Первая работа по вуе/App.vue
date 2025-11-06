<script setup>
import {reactive, ref} from 'vue'
import main1 from "./components/main.vue"

const inp = ref('')
const i =reactive({
  i1:"",
  i2:"",
  i3:"",
  i4:""
})

const a = 1
const b = 2
const c = 3
const d = 4

function aaa(value) {
  let g = inp.value+"\n"
  eval(`i.i${value}+=g`)
}
</script>



<template>
  <div>
    <input type="text" v-model="inp">
    <div>
      <button @click="aaa(1)">Лист {{ a }}</button>
      <button @click="aaa(2)">Лист {{ b }}</button>
      <button @click="aaa(3)">Лист {{ c }}</button>
      <button @click="aaa(4)">Лист {{ d }}</button>
    </div>
    <div>
      <main1 :num="a" :text="i.i1"/>
      <main1 :num="b" :text="i.i2"/>
      <main1 :num="c" :text="i.i3"/>
      <main1 :num="d" :text="i.i4"/> 
    </div>
  </div>
</template>

<style scoped></style>