

async function  checkAuth(){
    const token = localStorage.getItem('token')
    if(!token){
        location.href = '/login'
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

    console.log(tokenData)
   
    // if(authResp.code !== 200){
    //     localStorage.removeItem('token')
    //     location.href = '/login'
    // }
    // console.log(location.href)
    
}
checkAuth()