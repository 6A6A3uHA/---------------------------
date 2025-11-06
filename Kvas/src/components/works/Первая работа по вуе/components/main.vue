<script setup>
import {ref} from 'vue'
const props =defineProps({
    num: Number,
    text: String
})
</script>



<template>
  <div class="list">
    <p class>Лист {{ props.num }}</p>
    <div>
        {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
.list{
    display: flex;
    border-radius: 20px;
    border: 1px solid black;
    flex-direction: column;
    width: 200px;
    height: 200px;
    white-space: pre-wrap;
    overflow: scroll;
}
</style>