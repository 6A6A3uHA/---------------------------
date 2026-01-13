<script setup>
import { useRoute} from 'vue-router';
const curpage = useRoute()

</script>

<template>
  <header>
    <div style="width: 70%; height: 80px;"><img src="./assets/logo.webp" style="width: auto; height: 80px; position: relative; left: -160px;"></div>
    <RouterLink :to="{name:'home'}" class="btn" :class="{curpage:curpage.name=='home'}">Главная</RouterLink>
    <RouterLink :to="{name:'catalog'}" class="btn" :class="{curpage:curpage.name=='catalog'}">Каталог</RouterLink>
    <RouterLink :to="{name:'cart'}" class="btn" :class="{curpage:curpage.name=='cart'}">Корзина</RouterLink>
    <RouterLink :to="{name:'log_in'}" class="btn" :class="{curpage:curpage.name=='log_in'}">Вход</RouterLink>
    <RouterLink :to="{name:'sign_in'}" class="btn" :class="{curpage:curpage.name=='sign_in'}">Регистрация</RouterLink>
    <RouterLink :to="{name:'about'}" class="btn" :class="{curpage:curpage.name=='about'}">О нас</RouterLink>
  </header>
  <main>
    <RouterView/>
  </main>
  
  <footer>
    <hr>
    <div class="footer-content">
    <p>© 2025 «Вкусный вечер» — доставка готовой еды</p>
    <p>Телефон: +7 (812) 123-45-67 | Email: info@vkusnyve4er.local</p>
    <nav>
      <p>Мы в соцсетях</p>
      <a href="#">VK</a> •
      <a href="#">Telegram</a> •
      <a href="#">WhatsApp</a>
      <p v-if="curpage.name=='home'">Все права не защищены, мне угрожают занизить оценку если я не сделаю эту страницу :(</p>
      <p v-if="curpage.name=='home'">Интересно я достаточно сделал?</p>
    </nav>
    </div>
  </footer>
</template>

<style scoped>
header{
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  top: 0%;
  left: 0px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #3f3f3f;
  z-index: 9999;
}
.btn{
  border: 1px solid #646cff;
  border-radius: 20px;
  padding: 0px 5px;
  box-shadow: 4px 4px black;
}
.btn:hover{
border: 1px solid gray;
}

main{
  height: 100%;
  width: 100%;
  margin-top: 67px;
}
.curpage{
  border: 1px solid rgb(192, 192, 187);
}
hr{
  border-color: #646cff;
}
footer{
  margin-top: 80px;
  margin-bottom: 80px
}
</style>
