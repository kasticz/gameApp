

async function  checkAuth(){
    const url = location.pathname
    if(url === '/register'){
        return
    }
    const token = localStorage.getItem('token')
    if(!token){
        if(url !== '/login'){
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
    if(authResp.status !== 200 && url !== '/login'){
        localStorage.removeItem('token')
        location.href = '/login'
        return
    }


    
    if(authResp.status === 200 && (url === '/' || url === '/login')){        
        location.href = `/games?uid=${tokenData._id}`
        return
    }
    
    
}
checkAuth()