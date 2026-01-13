<script setup>
import {ref, reactive} from 'vue'
import importComp from './components/import comp.vue';
const list = reactive({list:['1', '2', '3', '4', '5']})
function addElem(a) 
  {
  if (a.inp.trim() != "") 
  {list.list.push(a.inp)
  console.log(list.list)}
  
  else
  {list.list.push("Вы ничего не ввели")
  setTimeout(() => {
    list.list.pop()}, 2000);}
  }
</script>

<template>
  <div>
    <importComp :text = "list.list" @event-a="addElem"/>
  </div>
</template>

<style scoped>

</style>
