<script setup>
import { onMounted, reactive, ref } from 'vue';

const imgs = ref([  {path:'./src/assets/action1.webp', text:'Новогодние наборы со скидкой 30% — вкус праздника доступнее!'},
                    {path:'./src/assets/action2.webp', text:'Новинка в меню: сочные стейки уже в продаже!'}, 
                    {path:'./src/assets/action3.webp', text:'Здоровое питание стало ещё вкуснее — обновлённая линейка уже здесь!'},
                    {path:'./src/assets/action4.webp', text:'Доставим ваш праздничный ужин — быстро, горячо и без хлопот!'}, 
                    {path:'./src/assets/action1.webp', text:'Новогодние наборы со скидкой 30% — вкус праздника доступнее!'}
                ])

const cards = ref   ([  {path:'./src/assets/card1.webp', name:'Новогодняя елка с сыром и зеленью', description:"Легкая закуска для веселого вечера<br>Каллории: 315г, белки: 10г, жиры: 18г, углеводы: 29г"},
                        {path:'./src/assets/card2.webp', name:'Говядина с овощами, черносливом и грибами', description:"Сытно, вкусно, по-домашнему.<br>Каллории: 138г, белки: 8г, жиры: 8г, углеводы: 10г"},
                        {path:'./src/assets/card3.webp', name:'Тёплый салат с курицей и киноа', description:"Лёгкий, но сытный — идеален для обеда<br>Калории: 298 ккал, белки: 22г, жиры: 12г, углеводы: 24г"},
                        {path:'./src/assets/card4.webp', name:'Суп-пюре из тыквы с кокосом', description:"Нежный вкус и уют в каждой ложке<br>Калории: 210 ккал, белки: 5г, жиры: 14г, углеводы: 18г"},
                        {path:'./src/assets/card5.webp', name:'Пельмени из телятины с трюфельным маслом', description:"Премиум-класс для особого ужина<br>Калории: 412 ккал, белки: 19г, жиры: 22г, углеводы: 32г"}
                    ])

let interval_id
let flag_scroll = true         
const transition = ref("1s")
const translation = ref("0px")
let number=0
function right(flag=0) 
    {if (flag_scroll) 
        {flag_scroll=false
        if (interval_id && flag==1) 
            {console.log(interval_id);
            clearInterval(interval_id)
            interval_id = 0}
        number++
        if (number== imgs.value.length) 
            {transition.value = "0s"
            number = 0
            translation.value = `${number*(-1920)}px`
            setTimeout(() => 
                {transition.value = "1s"
                number++
                translation.value = `${number*(-1920)}px`}, 1);
            }
        else
            {translation.value = `${number*(-1920)}px`}
        setTimeout(() => {
            flag_scroll=true
        }, 1500);
        }
    }

function left(flag=0) 
    {if (flag_scroll) 
        {flag_scroll=false
        if (interval_id && flag==1) {
            console.log(interval_id);

            clearInterval(interval_id)
            interval_id = 0
        }
        number--
        if (number== -1) {
            transition.value = "0s"
            number = imgs.value.length-1
            translation.value = `${number*(-1920)}px`
            setTimeout(() => {
                transition.value = "1s"
                number--
                translation.value = `${number*(-1920)}px`
            }, 1);
        }
        else{translation.value = `${number*(-1920)}px`}
        setTimeout(() => {
            flag_scroll=true
        }, 1500);
        }
    }

function start_slide_right() {
    interval_id=setInterval(() => {
        right(0)
    }, 7000);
}
onMounted(()=>{start_slide_right()})

</script>

<template>
    
    <div class="slider">
        <div class="wrapper">
            <button class="btnl" @click="left(1)"><</button>
            <div class="slides">
                <div class="size" v-for="value, index in imgs" :key="index">
                    <img :src="value.path">
                    <h2>{{ value.text }}</h2>
                </div>
                
            </div>
            <button class="btnr" @click="right(1)">></button>
        </div>
    </div>
    <h2 class="section">Наши популярные блюда</h2>
    <div class="popular">
        <template v-for="card, index in cards" :key="index">
            <div class="card">
                <div class="card_img">
                    <img :src="card.path">
                </div>
                <h3>{{ card.name }}</h3>
                <p v-html="card.description"></p>
            </div>
        </template>
    </div>
    <h2 class="section">Как заказать?</h2>
    <div class="steps">
      <div class="step">
        <span>1</span>
        <p>Выберите блюдо</p>
      </div>
      <div class="step">
        <span>2</span>
        <p>Оформите заказ</p>
      </div>
      <div class="step">
        <span>3</span>
        <p>Получите доставку</p>
      </div>
    </div>
</template>

<style scoped>
:root{
    --position: -1920px;
    --transition: 1s;
}
.slider{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 30px;
    background-color: grey;
}
.wrapper{
    width: 1920px;
    min-height: 420px;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;
}
.btnl{
    padding: 3px 10px 7px 10px;
    border-radius: 30px;
    position: absolute;
    left: 630px;
    z-index: 9998;
    text-align: center;
}
.btnr{
    padding: 3px 10px 7px 10px;
    border-radius: 30px;
    position: absolute;
    left: 1200px;
    z-index: 9998;
    
}
.slides{
    position: relative;
    top: 30px;
    display: flex;
    flex-flow: row nowrap;
    transform: translateX(v-bind(translation));
    transition: v-bind(transition);
}
.size{
    position: relative;
    left: -28px;
    width: 1920px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: center;
    flex-shrink: 0;
}
.section{
    font-size: 1.8rem;
    margin: 40px 0 20px;
    text-align: center;
}
.popular{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}
.card{
    margin: 40px;
    height: 400px;
    width: 200px;
    border: 1px solid darkblue;
    border-radius: 40px;
    background-color: rgb(75, 74, 74);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    box-shadow: 5px 6px black;
}
.card_img{
    width: 180px;
    height: 180px;
    overflow: hidden;
    object-position: center center;
}
.card_img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
}
.steps {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
}
.step {
  text-align: center;
}
.step span {
  display: block;
  width: 40px;
  height: 40px;
  background: #646cff;
  color: white;
  border-radius: 50%;
  line-height: 40px;
  font-weight: bold;
  margin: 0 auto 10px;
}
</style>