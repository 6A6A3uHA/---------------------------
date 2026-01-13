<script setup>
import { computed } from 'vue';

    const props = defineProps({item:""})//Принимаем ключ локального хранилища(логин)
    const root = defineModel('root')//Принимаем ключ прав админа
    const ref_list = defineModel('ref_list')//Принимаем список ключей локального хранилища для удаления(с правами админа)
    const key = props.item//для удобства обращения присваеваем пропс обычной переменной
    let user//создаем переменную будущего пользователя для дальнейшего присвоения ему значений
    let flag//Флаг отображения кнопки удаления пользователя для админа
    if (localStorage[key]) {//получает пользователя по ключу и определяект отображение кнопки удаления пользователя
        user = JSON.parse(localStorage[key])
        flag = true
        if (user.login=="admin") {
            flag=false
        }
    }
    else{
        user = {login:"login", password:"password", email:"email", name:"name", phone:"phone"}
        flag = false
    }
    const length_column = computed(() => root.value ? 6 : 4)//Динамиччески определяет длину таблицы по столбцам для отображения данных о пользователе(4 для обычного и 6 для админа)
    function delete_user() {//Функция прикрепленная к кнопки удаления пользователя. Удаляет пользователя из локального хранилища и таблицы пользователей на странице
        localStorage.removeItem(key)
        let index =  ref_list.value.indexOf(key)
        console.log(key,index);
        ref_list.value.splice(index,1)
    }
</script>

<template>
    <div class="grid" :style="{'--length_column':length_column}">
        <div class="start">
            {{ user.login }}
        </div>
        <div v-if="root" class="start">
            {{ user.password }}
        </div>
        <div class="start">
            {{ user.email }}
        </div>
        <div class="start">
            {{ user.name!="" ? user.name : "-" }}
        </div>
        <div class="start">
            {{ user.phone!="" ? user.phone : "-" }}
        </div>
        <div v-if="root" class="start">
            <button @click="delete_user" v-if="flag">Удалить пользователя</button>
            <div v-else>{{ user.login=="admin"? "Access denied": "Delete user" }}</div>
        </div>
    </div>
</template>

<style scoped>
.start{
    border: 1px solid;
}
.border{
    border: 1px solid;
    width: 100%;
    height: 100%;
}
button{
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
    margin: 3px;
    background-color: unset;
    border-radius: 0px;
    color: rgb(157, 91, 219);
    transition: none;
    padding: 0;
}
button:hover{
    border: 0px;
    color:rgb(215, 171, 255);
    border-radius: 0px;
}
.grid{
    display: grid;
    grid-template-columns: repeat(var(--length_column), 200px);
}
</style>