<script setup>
import { computed, reactive, ref } from 'vue';
import look_user from './show_user_from_key.vue'
const ref_user = defineModel()//Принимаем активный аккаунт из app.vue
const user = reactive(ref_user.value)//Переводим переменную из ref в reactive для удобства обращения
const root = computed(()=>user.login=="admin")//Создаем динамически обновляемую переменную которая проверяет права аккаунта
const ref_keys_localStorage = ref(Object.keys(localStorage))//Достаем все ключи из локального хранилища, т е все логины и активную сессию если есть
const keys_localStorage =reactive(ref_keys_localStorage.value)//Переводим переменную из ref в reactive для удобства обращения
let remove_session_from_list = keys_localStorage.indexOf('session')//Узнаем индекс сессии
if (remove_session_from_list != -1) //Если сессия находится в списке убираем сессию из списка
    {keys_localStorage.splice(remove_session_from_list, 1)
}
</script>

<template>
    <look_user v-model:root="root" class="fixed"/>
    <div class="scroll">
        <template v-for="user in keys_localStorage" :key="user"><!--Не знаю почему :key="user" помогает определять какой элемент удалять тут признаюсь нейронка помогла-->
            <look_user :item="user" v-model:root="root" v-model:ref_list="ref_keys_localStorage"/>
        </template>
    </div>
</template>

<style scoped>
.position{
    width: 80%;
    height: auto;
    overflow-x: visible;
    overflow-y: scroll;
    display: flex;
    justify-content: start;
    align-items: center;
    align-self: center;
    flex-direction: column;
    position: fixed;
    top: 470px;
}
.border{
    border: 1px solid rgb(157, 91, 219);
}
.scroll{
    position: relative;
    width: 100.13%; /*При значении меньше появляется нижний скроллер который портит вид отображаемых пользователей*/
    max-height: 400px;
    overflow-y: scroll;
    border-bottom: 1px solid;
    border-right: 1px solid;
    border-top: 1px solid;
}
.fixed{
    position: sticky;
    top: 0px;
}
</style>