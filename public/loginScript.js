const loginForm = document.querySelector('.login')

// const token = localStorage.getItem('token')
// console.log(token)

location.href = '/register.html'
// function qwe(){

// }
// qwe()

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const form = new FormData(loginForm)
    fetch('./auth/login',{
        method: 'POST',
        body:JSON.stringify({login:form.get('login'),password:form.get('password')}),
        headers:{
            'Content-type': 'application/json'
        }
    })
})

