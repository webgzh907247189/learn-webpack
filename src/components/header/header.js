import style from './header.css'
import fetch from 'isomorphic-fetch'

function appendChildren(){
    let id = document.getElementById('app')
    id.innerHTML = `<h1 class=${style.test}>webpackTest</h1>`
}


function getJSON(){
    fetch('/test')
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res,'fetch请求')
    })
}

export {
    appendChildren,
    getJSON
}