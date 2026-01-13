<script setup>
import { reactive, ref } from 'vue'
import inp from './input.vue'
const emit = defineEmits(["edit_user"])//Принимаем функцию из app.vue для записи аккаунта в локальное хранилище
const ref_parent_user = defineModel('user') //принимаем внешние данные пользователя из app.vue
const out = defineModel('out') //Переменная хранится в app.vue нужна для безшовного отображения вывода при неправильном регистрации аккаунта
const parent_user = reactive(ref_parent_user.value)//Переводим переменную из ref в reactive для более удобного обращения
// Переменная содержащая все необходимые данные для каждого поля input
const user_to_child = ref({ login:{     input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный логин.\nРазрешенные символы (A-z, 0-9 '_').\nНе менее 4 символов.", 
                                        placeholder:"Введите логин", 
                                        type:"login", 
                                        label:"Ваш логин:"},

                            password:{  input:""},

                            password1:{ input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный пароль.\nРазрешенные символы (A-z, 0-9, '-', '.', '_').\nНе менее 8 символов.", 
                                        placeholder:"Введите пароль", 
                                        type:"password1", 
                                        label:"Ваш пароль:"},

                            password2:{ input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный пароль.\nРазрешенные символы (A-z, 0-9, '-', '.', '_').\nНе менее 8 символов.", 
                                        placeholder:"Повторите пароль", 
                                        type:"password2", 
                                        label:"Повторите пароль:"},

                            email:{     input:"", 
                                        incorrect:false, 
                                        correct:false, 
                                        out_text:"Вы ввели не коректный Email.\nРазрешенные символы (A-z, 0-9, '-', '.', '_').\nНе менее 1 символа до конструкции '@mail.ru'/'@gmail.com'.", 
                                        placeholder:"Введите email", 
                                        type:"email", 
                                        label:"Ваш Email:"},

                            name:{      input:"", 
                                        incorrect:false, 
                                        correct:true, 
                                        out_text:"Вы ввели не коректное имя.\nРазрешенные символы (А-я), не менее 2 символов.\nПервый символ заглавный.", 
                                        placeholder:"Введите имя", 
                                        type:"name", 
                                        label:"Ваше имя(Не обязательно):"},

                            phone:{     input:"", 
                                        incorrect:false, 
                                        correct:true, 
                                        out_text:"Вы ввели не коректный номер телефона\nРазрешенные символы (0-9) начинается с '+(1-9)' и никак иначе.\nНе менее 5 цифр", 
                                        placeholder:"Введите телефон", 
                                        type:"phone", 
                                        label:"Ваш телефон(Не обязательно):"}})

const user = reactive(user_to_child.value)// перевод переменной из ref в reactive для более удобного обращения

function get_value_from_storage() {
    const local_user = JSON.parse(localStorage[parent_user.login])
    user.login.input=local_user.login
    user.password.input=local_user.password
    user.password1.input=local_user.password
    user.password2.input=local_user.password
    user.email.input=local_user.email
    user.name.input=local_user.name
    user.phone.input=local_user.phone
    check_validation("login")
    check_validation("password1")
    check_validation("password2")
    check_validation("email")
    check_validation("name")
    check_validation("phone")
    out.value=""
}
get_value_from_storage()

function check_validation(field) { //Проверяет валидацию каждого input
    const regex = { login:/[\w]{4,20}/,
                    password1:/[\w\-\.]{8,20}/,
                    password2:/[\w\-\.]{8,20}/,
                    email:/[\w\-\.]+\@(mail\.ru|gmail\.com)/,
                    name:/(^[А-Я][а-яё]+$|^$)/,
                    phone:/(^\+[1-9][\d]{4,}$|^$)/}
    if (regex[field].test(user[field].input)) {
        user[field].incorrect = false
        user[field].correct = true  
    }
    else{
        user[field].correct=false
        user[field].incorrect=true
    }
    if (user.password1.input!=user.password2.input && user.password2.input!="") {
        user.password2.out_text = "Пароли не совпадают"
        user.password2.incorrect=true
        user.password2.correct=false
    }
}

function hide_out(field) {//Прячет вывод итогов валидации функции check_validation
    user[field].correct=false
    user[field].incorrect=false
}

function edit_user() {//Еще раз проверяет каждое поле ввода на коректность введенных данных и делает попытку записи аккаунта в локальное хранилище
    let flag=true
    for (let key in user){
        if (!['password','password1','password2'].includes(key)){
            if (!user[key].correct) {
                flag=false
                out.value="проверьте правильность заполнения всех полей"
            }
        }
        else{
            if (user.password1.input==user.password2.input && user.password1.correct) {
                user.password.input=user.password1.input
                out.value=""
            }
            else{
                out.value="Проверьте правильность ввода полей"
                flag=false
            }
        }
    }
    if (flag) {
        parent_user.login=user.login.input
        parent_user.password=user.password.input
        parent_user.email=user.email.input
        parent_user.name=user.name.input
        parent_user.phone=user.phone.input
        emit('edit_user')
    }
    else{
        check_validation("login")
        check_validation("password1")
        check_validation("password2")
        check_validation("email")
        check_validation("name")
        check_validation("phone")
    }
}
</script>

<template>
    <div class="center">
        <h1>Редактирование аккаунта</h1>
        <form novalidate @submit.prevent="edit_user" >
            <inp v-model="user_to_child.login" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="user_to_child.password1" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="user_to_child.password2" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="user_to_child.email" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="user_to_child.name" @check_validation="check_validation" @hide_out="hide_out"/>
            <inp v-model="user_to_child.phone" @check_validation="check_validation" @hide_out="hide_out"/>
            <div class="red">{{ out }}</div>
            <input type="submit" value="Сохранить изменения">
        </form>
        <button @click="get_value_from_storage">Сбросить поля до начальных</button>
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

button{
    overflow: hidden;
    width: fit-content;
    display: flex;
    position: relative;
    top: -48px;
    align-self: center;
    margin-top: 20px;
    background-color: rgb(31, 31, 31);
    border: 1px solid rgb(255, 255, 255);
    padding: 5px 10px 5px 10px;
    border-radius: 10px;
    font-size: small;
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