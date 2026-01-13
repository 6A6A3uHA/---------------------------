<script setup>
import { reactive, ref } from 'vue';
import inp from './input.vue'
const emit = defineEmits('get_user_from_storage') // Достаем из app.vue функцию получения аккаунта из хранилища по логину и паролю
const out = defineModel('out') //Переменная хранится в app.vue нужна для безшовного отображения вывода при неправильном входе в аккаунт
const ref_parent_user = defineModel('user') // Достаем из app.vue переменную акаунта как ref
const parent_user = reactive(ref_parent_user.value) // Для дальнейшего более удобного взаимодействия переводим ref в reactive
const ref_user = ref    ( // Хранит введенные пользователем логин и пароль
                        {  login :     {input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный логин.\nРазрешенные символы (A-z, 0-9 '_').\nНе менее 4 символов.", 
                                        placeholder:"Введите логин", 
                                        type:"login", 
                                        label:"Логин:"},

                            password:   {input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный пароль.\nРазрешенные символы (A-z, 0-9, '-', '.', '_').\nНе менее 8 символов.", 
                                        placeholder:"Введите пароль", 
                                        type:"password", 
                                        label:"Пароль:"}
                        })
const user = reactive(ref_user.value) // Для удобства дальнейшего обращения переводим из ref в reactive

function log_in() { // перед попыткой получения аккаунта из хранилища проверяет корректность введенных данных
    check_validation('login')
    check_validation('password')
    if (user.login.correct && user.password.correct) {
        parent_user.login = user.login.input
        parent_user.password = user.password.input
        emit('get_user_from_storage')
    }
    else{
        out.value="Вы ввели не корректные данные"
    }
}

function check_validation(field) { //проверяет корректность введенных данных для каждого поля
    const regex = { login:/[\w]{4,20}/,
                    password:/[\w\-\.]{8,20}/}

    if (regex[field].test(user[field].input)) {
        user[field].incorrect = false
        user[field].correct = true  
    }
    else{
        user[field].correct=false
        user[field].incorrect=true
    }
}

function hide_out(field) // Прячет выводы у input до обновления функции check_validation
    {user[field].incorrect=false
    user[field].correct=false
    }
</script>

<template>
    <div>
        <h1>Вход</h1>
        <form novalidate @submit.prevent="log_in">
            <inp v-model="ref_user.login" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="ref_user.password" @check_validation="check_validation" @hide_out="hide_out"/>
            <div class="red">{{ out }}</div>
            <input type="submit" value="Войти">
        </form>
    </div>
</template>

<style scoped>
form{
    display: flex;
    justify-content: center;
    align-items: start;
    width: 300px;
    flex-direction: column;
    justify-content: space-between;
}
input[type=submit]{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    background-color: rgb(31, 31, 31);
    border: 1px solid rgb(255, 255, 255);
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
}
.red{
    color: red;
}
</style>