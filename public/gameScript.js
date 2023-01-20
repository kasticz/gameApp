const gameForm = document.querySelector('.gameWrapper')
const gameButtons = document.querySelector('.gameButtons')
const editButton = document.querySelector('.editButton')
const createButton = document.querySelector('.createButton')
const gameTitle = document.querySelector('.title')
const gameDescr = document.querySelector('.descr')
const gameScore = document.querySelector('.score')
const gameDate = document.querySelector('.date')
const loadingWrapper = document.querySelector('.loadingWrapper')
const error = document.querySelector('.error')
const backButton = document.querySelector('.backButton')




async function fetchGameInfo(){
    const url = new URLSearchParams(location.search)
    const isEdit = url.get('edit') == 1
    const gameUid = url.get('gameuid')
    const userUid = url.get('uid')
    if(!userUid){
        error.textContent = 'Что-то пошло не так. Попробуйте позже.'
        setTimeout(() => {
            location.href = '/login'
        }, 1000);
        return
    }
    
    if(!isEdit){
        loadingWrapper.style.display = `none`
        gameForm.style.display = 'block'
        createButton.style.display = 'flex'        
        return
    }

    const gameResp = await fetch('/api/gamesAPI/game',{
        method: 'POST',
        body: JSON.stringify({gameUid}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const gameData = await gameResp.json()
    const {score,title,descr,date} = gameData
    if(gameData){
        gameTitle.value = title
        gameScore.value = score
        gameDescr.value = descr ? descr : ''
        gameDate.value = date
        loadingWrapper.style.display = `none`
        gameForm.style.display = 'block'
        editButton.style.display = 'flex'       
        return   
    }


}

fetchGameInfo()

async function editGame(){
    const url = new URLSearchParams(location.search)
    const gameUid = url.get('gameuid')
    const gameObj = {title:gameTitle.value,score:Number(gameScore.value),descr:gameDescr.value,date:gameDate.value,gameUid}
    const editResp = await fetch('/api/gamesAPI/editGame',{
        method: 'POST',
        body: JSON.stringify({gameObj}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(editResp.status !== 200){
        error.textContent = 'Произошла ошибка. Попробуйте позже'
    }else{
        error.textContent = 'Игра изменена!'
        error.style.color = 'green'
    }
    
}

async function createGame(){
    const url = new URLSearchParams(location.search)
    const userUid = url.get('uid')
    if(!userUid){
        error.textContent = 'Произошла ошибка. Попробуйте позже'
        return
    }
    const gameObj = {title:gameTitle.value,score: gameScore.value,descr:gameDescr.value,date:new Date(),user:userUid}

    const createResp = await fetch('/api/gamesAPI/createGame',{
        method: 'POST',
        body: JSON.stringify({gameObj}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const createData = await createResp.json()
    if(createResp.status !== 200){
        error.textContent = 'Произошла ошибка. Попробуйте позже'
    }else{
        error.textContent = 'Игра создана'
        error.style.color = 'green'
    }
    
}

gameForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const url = new URLSearchParams(location.search)
    const isEdit = url.get('edit') == 1
    if(isEdit){
        await editGame()
    }else{
        await createGame()
    }

})

backButton.addEventListener('click',(e)=>{
    window.history.go(-1)
})