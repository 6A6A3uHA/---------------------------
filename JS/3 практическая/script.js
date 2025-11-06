const correct_name = /^[А-Я][а-я]{1,}/
const correct_date = /(0[1-9]|[1-2][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19[0-9]{2}|20[01][0-9]|202[0-5])/
const test_or_result = {inp:'input type="radio"', p:'p'}
const rounding_or_p = {inp:`input type="text" name="rounding" minlength="1" maxlength="5" placeholder="1,2345"`, p:`p name="rounding"`}
const end_p = {inp:'', p:'</p>'}
const form_account = document.forms.form_account
const errs = document.getElementsByClassName("err")
const nologin = document.getElementsByClassName("nologin")
const account_info = document.getElementById("account")

const reg = document.getElementById("reg")
const test = document.getElementById("test")
const result = document.getElementById("result")
let account = {}

let session = "-1"
session = localStorage.getItem("active_session")


// localStorage.clear()

function hide_look_content() {//Прячет или показывает кнопки перехода и аккаунт
    if (account.name) {
        account_info.innerText = `Имя:${account.name} \nДата:${account.date} \nПол:${account.sex}`
        for (let i = 0; i < nologin.length; i++) {
            nologin[i].classList.remove('hide')
            go_test()
        }
    }else{
        account_info.innerText =``
        for (let i = 0; i < nologin.length; i++) {
            nologin[i].classList.add('hide')
            
        }
    }
}


function get_storage() {// Достает аккаунт из хранилища
    if (session != null && session != -1) {
        console.log("Достается аккаунт активной сессии");
        account = JSON.parse(localStorage.getItem(session))

    }
    else
        {
        a = have_storage()
        if (a == -1 && (session == null || session == -1)) {
            console.log("Аккаунта не обнаружено, активной сессии нет");
            account = {}
        }
        if (a != -1 && (session == null || session == -1)) {
            console.log("Аккаунт обнаружен, активной сессии нет");
            account = JSON.parse(localStorage.getItem(a))
        }}
    hide_look_content()
}
get_storage()

function have_storage() {// Проверка аккаунта на странице на соответствие аккаунта в локальном хранилище
    
    
    let key = -1
    let b = 0
    for (b = 0; b < localStorage.length; b++) 
        { console.log(b);
        let acc_storage = JSON.parse(localStorage.getItem(b))
        console.log(acc_storage);
        if (acc_storage != null) {
            if (account.name == acc_storage.name && account.date == acc_storage.date && account.sex == acc_storage.sex) 
            {key = b; break} }
        }
    if (key == -1) {
        console.log("Аккаунта не найдено");
    }
    else
        {console.log("Аккаунт найден под номером", b);}

    return(key)
    }

function go_storage() {// Отправляет аккаунт в хранилище
    true_id = -1
    key_account = have_storage()
    if (key_account == -1 && session == null) {
        console.log("Создается новый аккаунт, активной сессии не обнаружено");
        true_id = localStorage.length
    }
    if (session != null && key_account ==-1) {
        console.log("Создается новый аккаунт, активная сессия, если не равно -1 является id предыдущего аккаунта", session);
        true_id = localStorage.length-1
    }
    if (key_account != -1) {
        console.log("Существующий аккаунт обнаружен, все изменения пойдут в него, id аккаунта", key_account);
        true_id = key_account
    }
    if (true_id != -1) {
        console.log("Создание или перезапись аккаунта");
        localStorage.setItem(true_id, JSON.stringify(account))
        localStorage.setItem("active_session", true_id)
    }
    else{
        console.log("Возникла ошибка с размещением аккаунта в хранильще");
        
    }
}


function check_correct_account() {// Проверяет правильность регистрации, если правильно заносит данные в аккаунт, прячет блок регистрации и открывает тест, если не правильно выделяет неверно заполненные поля
    const usr_name = form_account.name.value
    const usr_date = form_account.date.value
    const usr_sex = form_account.sex.value
    let flag_next = false
    
    if (correct_name.test(usr_name) && correct_date.test(usr_date) && usr_sex!=0) {
        account.name=usr_name
        account.date=usr_date
        account.sex=usr_sex
        
        console.log(account);
        flag_next = true
    
    form_account.reset()}
    else
    {if (!correct_name.test(usr_name)) {errs[0].classList.add("showup")}
    else{errs[0].classList.remove("showup")}
    if (!correct_date.test(usr_date)) {errs[1].classList.add("showup")}
    else{errs[1].classList.remove("showup")}
    if (usr_sex==0) {errs[2].classList.add("showleft")}
    else{errs[2].classList.remove("showleft")}}

    return(flag_next)
}

function inner(inp_or_p) {//Преобразует HTML как тест или как просмотр теста, без возможности отвечать, по переменной(Допустимые значения: inp/p)
    let test_html=`
            <h1>Тест по математике</h1>
            <div class="form">
                <form name="test" novalidate>
                    <div class="quest">
                        <p>Чему равна сумма 3-х углов треугольника:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="degree" value="0" checked>90°${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="degree" value="1">180°${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="degree" value="2">360°${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Выберите правильный порядок математических действий:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="order_operations" value="0" checked>Сначала выполняется умножение и деление, затем сложение и вычитание${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="order_operations" value="1">Сначала выполняется сложение и вычитание, затем умножение и деление${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="order_operations" value="2">Все действия выполняются по порядку слева направо, независимо от стоящих знаков${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Как называются два треугольника с равными углами и пропорциональными сторонами:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="similar" value="0" checked>Равносторонние${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="similar" value="1">Подобные${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="similar" value="2">Правильные${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Что такое теорема:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="theorem" value="0" checked>Математическое утверждение, истинность которого установлена путём доказательства${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="theorem" value="1">Исходное положение какой-либо теории, принимаемое в рамках данной теории истинным без требования доказательства${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="theorem" value="2">Предположение или догадка, которая требует доказательства${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>С каких двух чисел начинаются Числа Фибоначчи:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="Fibonacchi" value="0" checked>0 и 1${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="Fibonacchi" value="1">1 и 3${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="Fibonacchi" value="2">0 и 2${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Округлите десятичную дробь 3,65478 до сотых чисел:</p>
                        <${rounding_or_p[inp_or_p]}>${end_p[inp_or_p]}
                    </div>
                    <div class="quest">
                        <p>Ось координат, которая проводится горизонтально, называется:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="coordinates" value="0" checked>Ось абсцисс${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="coordinates" value="1">Ось ординат${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="coordinates" value="2">Ось аппликат${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Чему равен квадратный корень числа 484:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="root" value="0" checked>22${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="root" value="1">24${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="root" value="2">42${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Чему равен модуль числа -7,8</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="module" value="0" checked>-7,8${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="module" value="1">7,8${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="module" value="2">8,7${end_p[inp_or_p]}</li>
                        </ul>
                    </div>
                    <div class="quest">
                        <p>Чтобы найти длину гипотенузы прямоугольного треугольника, нужно применить теорему:</p>
                        <ul>
                            <li><${test_or_result[inp_or_p]} name="Pythagoras" value="0" checked>Декарта${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="Pythagoras" value="1">Пифагора${end_p[inp_or_p]}</li>
                            <li><${test_or_result[inp_or_p]} name="Pythagoras" value="2">Пуанкаре${end_p[inp_or_p]}</li>
                        </ul>
                    </div>

                    <div class="center"><input type="submit" value="Сдать"></div>
                </form>
            </div>
            `
    return(test_html)
}

function go_result(a) {
    reg.classList.remove("look")
    test.innerHTML = ""
    test.classList.remove("look")
    result.innerHTML = inner("p")
    list = account.result[a]
    
    const degree = document.getElementsByName("degree")//3
    if (list.degree =="1") 
        {degree[list.degree].classList.add("green")}
    else
        {degree[list.degree].classList.add("red")}
    
    const order_operations = document.getElementsByName("order_operations")//3
    if (list.order_operations =="0") 
        {order_operations[list.order_operations].classList.add("green")}
    else
        {order_operations[list.order_operations].classList.add("red")}
    
    const similar = document.getElementsByName("similar")//3
    if (list.similar =="1") 
        {similar[list.similar].classList.add("green")}
    else
        {similar[list.similar].classList.add("red")}

    const theorem = document.getElementsByName("theorem")//3
    if (list.theorem =="0") 
        {theorem[list.theorem].classList.add("green")}
    else
        {theorem[list.theorem].classList.add("red")}

    const Fibonacchi = document.getElementsByName("Fibonacchi")//3
    if (list.Fibonacchi =="0")
        {Fibonacchi[list.Fibonacchi].classList.add("green")}
    else
        {Fibonacchi[list.Fibonacchi].classList.add("red")}

    const rounding = document.getElementsByName("rounding")//1
    rounding[0].innerText=list.rounding
    if (list.rounding.trim() == "3,65") 
        {rounding[0].classList.add("green")}
    else
        {rounding[0].classList.add("red")}
    
    const coordinates = document.getElementsByName("coordinates")//3
    if (list.coordinates =="0")
        {coordinates[list.coordinates].classList.add("green")}
    else
        {coordinates[list.coordinates].classList.add("red")}

    const root = document.getElementsByName("root")//3
    if (list.root =="0")
        {root[list.root].classList.add("green")}
    else
        {root[list.root].classList.add("red")}

    const module = document.getElementsByName("module")//3
    if (list.module =="1")
        {module[list.module].classList.add("green")}
    else
        {module[list.module].classList.add("red")}

    const Pythagoras = document.getElementsByName("Pythagoras")//3
    if (list.Pythagoras =="1")
        {Pythagoras[list.Pythagoras].classList.add("green")}
    else
        {Pythagoras[list.Pythagoras].classList.add("red")}

    result.classList.add("look")
}

function take_result() {
    
}

function go_test() {
    reg.classList.remove("look")
    result.classList.remove("look")
    test.innerHTML = inner("inp")
    const form_test = document.forms.test
    test.classList.add("look")
    let test_res = {}
    form_test.addEventListener("submit", (event)=>{
        event.preventDefault()
        test_res.degree = form_test.degree.value
        test_res.order_operations = form_test.order_operations.value
        test_res.similar = form_test.similar.value
        test_res.theorem = form_test.theorem.value
        test_res.Fibonacchi = form_test.Fibonacchi.value
        test_res.rounding = form_test.rounding.value
        test_res.coordinates = form_test.coordinates.value
        test_res.root = form_test.root.value
        test_res.module = form_test.module.value
        test_res.Pythagoras = form_test.Pythagoras.value
        account.result.push(test_res)
        go_storage()
        go_result(0)
    })
}


form_account.addEventListener("submit", (event)=>{
    event.preventDefault()
    if (check_correct_account()) {

        if (!account.result) {
            account.result = []
        }
        go_storage()
        go_test()
        
    }
    })


// Имена полей в тесте
// degree
// order_operations
// similar
// theorem
// Fibonacchi
// rounding
// coordinates
// root
// module
// Pythagoras