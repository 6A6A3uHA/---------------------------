<script setup>
import {reactive, ref} from 'vue'
import main1 from "./components/main.vue"

const inp = ref('')
const i =reactive({
  i1:"",
  i2:"",
  i3:"",
  i4:"",
  l1:false,
  l2:false,
  l3:false,
  l4:false
})

const a = 1
const b = 2
const c = 3
const d = 4

function look(val) {
  for (let c = 1; c < 5; c++) {
    eval(`i.l${c} = false`)
  }
  eval(`i.l${val} = true`)
}

function aaa() {
  let cur_page = 0
  for (let c = 1; c < 5; c++) {
    eval(`if (i.l${c}) {
      cur_page = c
    }`)
  }
  let g = inp.value+"\n"
  eval(`i.i${cur_page}+=g`)
}
</script>



<template>
  <div>
    <input type="text" v-model="inp">
    <button @click="aaa">Записать</button>
    <div>
      <button @click="look(1)">Лист {{ a }}</button>
      <button @click="look(2)">Лист {{ b }}</button>
      <button @click="look(3)">Лист {{ c }}</button>
      <button @click="look(4)">Лист {{ d }}</button>
    </div>
    <div>
      <main1 v-if="i.l1" :num="a" :text="i.i1"/>
      <main1 v-if="i.l2" :num="b" :text="i.i2"/>
      <main1 v-if="i.l3" :num="c" :text="i.i3"/>
      <main1 v-if="i.l4" :num="d" :text="i.i4"/> 
    </div>
  </div>
</template>

<style scoped></style>