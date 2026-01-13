<script setup>
import { reactive, ref } from 'vue';
import registration from './components/registration.vue'
import log_in from './components/log_in.vue'
import list_users from './components/list_users.vue'
import edit_account from './components/edit_user.vue'
const out = ref("")
const ref_user = ref({login:"", password:"", email:"", name:"", phone:""})
const user = reactive(ref_user.value)
const current = ref("log_in")

if (localStorage.session) //Авто вход в аккаунт если не вышел из него
        {let local_user
        const login_password = JSON.parse(localStorage.session)
        local_user = JSON.parse(localStorage[login_password.login])
        if (login_password.password == local_user.password) {
            user.login = local_user.login
            user.password = local_user.password
            user.email = local_user.email
            user.name = local_user.name
            user.phone = local_user.phone
            current.value = "list_users"
        }
        }

function choose_page(page) // Отвечает за переключение страниц
    {current.value = page
    out.value = ""
    }

function set_user_to_storage() // Добавляет аккаунт в локальное хранилище
    {if (!localStorage[user.login]) 
        {localStorage.session = JSON.stringify({login:user.login, password:user.password})
        localStorage[user.login]=JSON.stringify(user)
        out.value = "Аккаунт добавлен в базу"
        current.value="list_users"}

    else
    {out.value = "такой аккаунт уже существует"}
    }

function get_user_from_storage() // Достает аккаунт из локального хранилища
    {let local_user
    if (localStorage[user.login]) 
        {local_user = JSON.parse(localStorage[user.login])
        if (user.password == local_user.password) 
            {localStorage.session = JSON.stringify({login:user.login, password:user.password})
            user.email = local_user.email
            user.name = local_user.name
            user.phone = local_user.phone
            current.value="list_users"}

        else
            {out.value = "Вы ввели не верный пароль"
            local_user = ""
            user.login=""
            user.password=""}
        }

    else
        {out.value = "Такого аккаунта не существует"
        user.login=""
        user.password=""}
    }

function edit_user_from_storage() {//Перезаписывает аккаунт в хранилище
    const old_login = JSON.parse(localStorage.session).login
    if (old_login!=user.login && !localStorage[user.login]||old_login==user.login) {
        localStorage.removeItem(old_login)
        localStorage.session=JSON.stringify({login:user.login, password:user.password})
        localStorage[user.login]=JSON.stringify(user)    
    }
    else{
        out.value = "Аккаунт с таким логином уже существует, изменение не удалось"
    }
    
}

function exit_account() //Выходит из аккаунта
    {localStorage.removeItem('session')
    user.login=""
    user.password=""
    user.email=""
    user.name=""
    user.phone=""
    current.value="log_in"
    }

</script>

<template>
    <header>
        <button @click="choose_page('registration')" :class="{active_page:current=='registration'}" v-if="user.login == ''">
            Регистрация
        </button>
        <button @click="choose_page('log_in')" :class="{active_page:current=='log_in'}" v-if="user.login == ''">
            Вход
        </button>
        <button @click="choose_page('list_users')" :class="{active_page:current=='list_users'}" v-if="user.login!=''">
            Список людей
        </button>
        <button  @click="choose_page('edit_account')" :class="{active_page:current=='edit_account'}" v-if="user.login != '' && user.login!='admin'">
            Редактировать профиль
        </button>
        <div class="column">
            <div v-if="user.login">логин: {{ user.login }}</div>
            <div v-if="user.email">email: {{ user.email }}</div>
            <div v-if="user.name != ''">имя: {{ user.name }}</div>
            <div v-if="user.phone != ''">телефон: {{ user.phone }}</div>
            <button class="out" @click="exit_account" v-if="user.login">Выйти</button>
        </div>
    </header>
    <div class="center">
        <registration v-if="current == 'registration'" v-model:user="ref_user" v-model:out="out" @set_user_to_storage="set_user_to_storage"/>
        <log_in v-if="current == 'log_in'" v-model:user="ref_user" v-model:out="out" @get_user_from_storage="get_user_from_storage"/>
        <list_users v-model="ref_user" v-if="current == 'list_users'"/>
        <edit_account v-if="current == 'edit_account'" v-model:user="ref_user" v-model:out="out" @edit_user="edit_user_from_storage"/>
    </div>
</template>

<style scoped>
header{
    position: absolute;
    width: auto;
    top: 20px;
    right: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header>button{
    margin: 10px;
}
.center{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
.active_page{
    background-color: rgb(131, 84, 176);
}
.column{
    display: flex;
    flex-direction: column;
    align-items: start;
}
.out{
    padding: 2px 5px 2px 5px;
    background-color: unset;
    color: rgb(157, 91, 219);
    text-align: start;
    border: 0px;
}
.out:hover{
    border: 0px;
    color: rgb(215, 171, 255);
}
</style>
