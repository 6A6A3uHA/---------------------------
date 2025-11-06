<script setup>
import {ref} from 'vue'
const name = ref('')
const name_check = /[А-Я][а-я]{1,}/
const date = ref('')
const date_check = /(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19[0-9][0-9]|20[01][0-9]|202[0-5])/
const result = ref('')

function check_validate() {
  if (name_check.test(name.value) && date_check.test(date.value)) {
    result.value ="Всё введено верно" 
  }
  else
  {
    if (!name_check.test(name.value)) {
      result.value = "Имя введено не верно"
    }
    if (!date_check.test(date.value)) {
      result.value = "Дата введена не верно"
    }
    if (!name_check.test(name.value) && !date_check.test(date.value)) {
      result.value = "Имя и дата введены не верно"
    }
  }
}
</script>



<template>
  <input type="text" v-model="name" placeholder="Имя">
  <input type="text" v-model="date" placeholder="dd.mm.yyyy">
  <button @click="check_validate">Жми ка</button>
  {{ result }}
</template>

<style scoped></style>
