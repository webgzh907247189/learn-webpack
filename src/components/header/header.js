import style from './header.css'

function appendChildren(){
    let id = document.getElementById('app')
    id.innerHTML = `<h1 class=${style.test}>webpackTest</h1>`
}

export {
    appendChildren
}