const error = document.querySelector('.error')
const usernameEl = document.querySelector('.username')
const logoutButton = document.querySelector('.logout')
const loadingWrapper = document.querySelector('.loadingWrapper')
const gamesWrapper = document.querySelector('.gamesWrapper')




async function fetchGames(){
    loadingWrapper.style.display = `block`
    const query = location.search
    const url = new URLSearchParams(window.location.search)
    const uid = url.get('uid')
    const gamesResp = await fetch('/api/gamesAPI/games',{
        method: 'POST',
        body: JSON.stringify({uid}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    const {games,username} = await gamesResp.json()

    if(gamesResp.status !== 200 || !username.login){
        error.textContent = 'Произошла ошибка. Попробуйте позже.'
        return
    }

    const addButton = document.createElement('a')
    addButton.classList.add('addAnchor')
    addButton.innerHTML = `<button class="addButton">Добавить новую игру</button>`
    addButton.href = `/game?uid=${uid}&new=1`
    error.insertAdjacentElement('afterend',addButton)
    usernameEl.textContent = ` Здравствуйте, ${username.login}`

    if(games?.length === 0){
        error.textContent = 'У вас ещё нет добавленных игр'
    }else{
        games.forEach((item)=>{
            const color = getScoreColor(item.score)   
            const uidHref = `/game?uid=${uid}`         
            gamesWrapper.insertAdjacentHTML(`beforeend`,`<li class="gameItem">
            <h3 class="gameTitle">${item.title}</h3>
            <p class="gameDescr">${item.descr ? item.descr : ''}</p>
            <div class="gameButtons">
            <a href=${uidHref}><button class="editGame">Редактировать</button></a> 
            <button class="deleteGame">Удалить</button>
            </div>
            <span class="gameScore"><span  style="color:${color}">${item.score}</span>  / 10</span>
            <span  class="gameDate">${item.date}</span>
            </li>`)         
        })
    }
    loadingWrapper.style.display = `none`

}


fetchGames()


logoutButton.addEventListener('click',(e)=>{
    localStorage.removeItem('token')
    location.href = '/login'
})



function getScoreColor(score){
    let color;
    if(score <= 2) color = `#ed3535`
    if(score <= 4 && score > 2) color = `#d1927c`
    if(score <= 6 && score > 4) color = `#a6a520`
    if(score <= 8 && score > 6) color = `#9fce42`
    if(score > 8) color = `#2ada2d`


    return color
}

gamesWrapper.addEventListener('click',(e)=>{
    console.log(e.target)
})