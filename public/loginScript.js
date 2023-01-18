const loginForm = document.querySelector('.login')
const errorPlaceholder = document.querySelector('.errorPlaceholder')



loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const form = new FormData(loginForm)
    const loginResp = await fetch('./auth/login',{
        method: 'POST',
        body:JSON.stringify({login:form.get('login'),password:form.get('password')}),
        headers:{
            'Content-type': 'application/json'
        }
    })
    const loginData = await loginResp.json()
    if(!loginData.res){
        errorPlaceholder.textContent = loginData.error
    }else{
        localStorage.setItem('token',loginData.token)
        location.href = `/games?uid=${loginData.uid}`
    }
})

