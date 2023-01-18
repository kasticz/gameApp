const registerForm = document.querySelector('.register')
const errorPlaceholder = document.querySelector('.errorPlaceholder')

registerForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const form = new FormData(registerForm)
    const resp = await fetch('./auth/register',{
        method: 'POST',
        body:JSON.stringify({login:form.get('login'),password:form.get('password'),email:form.get('email')}),
        headers:{
            'Content-type': 'application/json'
        }
    })

    const data = await resp.json()
    if(data.newError){    
        const err = data.newError
        if(err.messages)    {
            errorPlaceholder.textContent = err.messages.join(', ');
        }else{
           errorPlaceholder.textContent = err.message
        }        
    }else{
        const token = data.token
        localStorage.setItem('token',token)
        location.href = '/games'
    }
  

})