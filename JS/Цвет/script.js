// const btn = document.getElementById('btn')
// let a = 0
// function changecolor() {
//     // document.documentElement.style.setProperty('--color','green')
//     a++
//     a%=raduga.length
//     document.documentElement.style.setProperty('--color', raduga[a])
// }

// btn.addEventListener('click', changecolor)

// let raduga=['red','orange','yellow','green','blue','darkblue','purple']

const btnl = document.getElementById('btnleft')
const btnr = document.getElementById('btnright')
let a = 0
let img = ['0px', '-1200px', '-2400px']

function slidel() {
    a--
    if (a<0) {
        a = 2
    }
    a%=img.length
    document.documentElement.style.setProperty('--position', img[a])
}

function slider() {
    a++
    a%=img.length
    document.documentElement.style.setProperty('--position', img[a])
}
btnl.addEventListener('click', slidel)
btnr.addEventListener('click', slider)