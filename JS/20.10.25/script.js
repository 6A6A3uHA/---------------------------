authForm = document.forms.auth
testName = /^[А-Я][а-я]{1,}/


authForm.addEventListener('submit', (event)=>{
    event.preventDiferent()

    if (testName.test(authForm.name.value)) {
        
    }

})
