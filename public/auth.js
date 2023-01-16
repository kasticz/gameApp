

async function  checkAuth(){
    if(location.pathname === '/register'){
        return
    }
    const token = localStorage.getItem('token')
    if(!token){
        if(location.pathname !== '/login'){
            location.href = '/login'
        }
        return;
    }
    const authResp = await fetch('/auth',{
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const tokenData = await authResp.json()
   
    if(authResp.status !== 200 && location.pathname !== '/login'){
        // localStorage.removeItem('token')
        location.href = '/login'
        return
    }


    
    if(authResp.status === 200 && location.pathname === '/'){
        location.href = '/games'
        return
    }
    
    
}
checkAuth()