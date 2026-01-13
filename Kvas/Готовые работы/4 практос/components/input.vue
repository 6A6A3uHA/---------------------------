<script setup>
import { reactive, ref } from 'vue';
// Принимаем все необходимые данные из файла вызвавшего данный шаблон
const input = defineModel   ({default:ref   ({  input:"", 
                                                incorrect:false,
                                                correct:false, 
                                                out_text:"",
                                                placeholder:"", 
                                                type:"",
                                                label:"", 
                                            })
                            })
const inp = reactive(input.value) // переводим полученный ref в reactive
const emit = defineEmits(['check_validation', 'hide_out']) //Принимаем функции проверки валидации введенных данных и убирающую вывод итогов первой функции

</script>

<template>
    <div style="margin: 10px;">
        <label>{{ inp.label }}</label>
        <div class="input_and_output_row">
            <input type="text" v-model="inp.input" :placeholder="inp.placeholder" @focusout="emit('check_validation', inp.type)" @focusin="emit('hide_out', inp.type)"> 
            <div class="correct_input" :class="{show_correct:inp.correct}">✓</div>
        </div>
        <div class="incorrect_input" :class="{show_incorrect:inp.incorrect}">{{ inp.out_text }}</div>
    </div>
</template>

<style scoped>
input[type=text]{
    width: 200px;
}
label{
    display: flex;
    justify-content: start;
}
.input_and_output_row{
    display: flex;
    flex-flow: row nowrap;
}
.correct_input{
    margin-left: 20px;
    background-color: green;
    height: 25px;
    width: 0px;
    overflow: hidden;
    transition: 0.5s;
    border-radius: 20px;
}
.show_correct{
    width: 25px;
}
.incorrect_input{
    color:red;
    max-height: 0px;
    overflow: hidden;
    transition: 0.2s;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    text-align: left;
    white-space: pre-line;
}
.show_incorrect{
    max-height: 200px;
}
</style>