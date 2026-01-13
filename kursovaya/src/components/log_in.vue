<script setup>

</script>

<template>
    <h2>Вход</h2>
    <div class="login">
        <div class="field">
            <label for="login">Логин:</label>
            <input name="login" type="text">
        </div>
        <div class="field">
            <label for="password">Пароль:</label>
            <input name="password" type="text">
        </div>
        <div>
            <button>Войти</button>
        </div>
    </div>
    
</template>

<style scoped>
.login{
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    margin: 20px;
}
.field{
    display: flex;
    flex-flow: column;
    align-items: start;
}
</style>