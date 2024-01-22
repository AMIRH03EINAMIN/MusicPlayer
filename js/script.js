(function(){
/*------------------------------|Selector Function|------------------------------*/
function selector_DOM(from, method, elem, number){
    //variable
    let storeElem = ""
    //select element
    switch (method) {
        case "tag":
            storeElem = from.getElementsByTagName(elem)[number]
        break;
        case "id":
            storeElem = from.getElementById(elem)
        break;
        case "class":
            storeElem = from.getElementsByClassName(elem)[number]
        break;
        case "query":
            storeElem = from.querySelector(elem)
        break;
        case "queryAll":
            if (number !== undefined) {
                storeElem = from.querySelectorAll(elem)[number]
            }else{
                storeElem = from.querySelectorAll(elem)
            }
        break;
    }
    //return element
    return storeElem
}

/*------------------------------|Music|------------------------------*/

/*------|Global Variable|------*/
let audioTag = selector_DOM(document, "tag", "audio", 0)
let playPauseBtn = selector_DOM(document, "query", "#play i")
//music list
const musicList =[
    {
        src:"./media/Mehdi.mp3",
        photo:"./img/m1.jpg",
        name:"ZANG BEZANI",
        singer:"MEHDI AHMADVAND",
        time: "05:04"
    },
    {
        src:"./media/Armin.mp3",
        photo:"./img/m2.jpg",
        name:"DARAM HAVATO",
        singer:"ARMIN ZAREI",
        time: "02:28"
    },
]

/*------|Global Function|------*/
//change music details
function change_music_details(musicDetails){
    //change music src
    audioTag.setAttribute("src", musicDetails.src)
    //change img
    selector_DOM(document, "query", ".img-music img").setAttribute("src", musicDetails.photo)
    //change singer
    selector_DOM(document, "queryAll", ".properties p", 0).innerHTML = musicDetails.name
    //change name
    selector_DOM(document, "queryAll", ".properties p", 1).innerHTML = musicDetails.singer
    //change time
    selector_DOM(document, "queryAll", ".time-box p", 1).innerHTML = musicDetails.time
}
//change number
function add_zero(number){
    if(number < 10){
        number = "0" + number
    }
    return number
}
// current time 
function current_time(){
    //variable
    let minute = add_zero(Math.floor(audioTag.currentTime / 60))
    let second = add_zero(Math.floor(audioTag.currentTime % 60))
    //show current time
    selector_DOM(document, "queryAll", ".time-box p", 0).innerHTML = minute + ":" +  second 
}
// next or previous music
function next_previous_music(){
    //variable
    let music = ""
    let musicIndex = ""
    //get index of current music
    musicList.forEach(function(item, index){
        if(item.src === audioTag.getAttribute("src")){
            musicIndex = index
        }
    })
    //select next music
    if(this.id === "next"){
        music = musicList[musicIndex+1]
    }else{
        music = musicList[musicIndex-1]
    }
    //condition for return to the first list of music
    if(music === undefined){
        music = musicList[0]
    }
    change_music_details(music)
    audioTag.play()
    //change icon
    playPauseBtn.classList = "fa-solid fa-pause"
}

/*------|EventListener|------*/
//eventListener play and pause button
selector_DOM(document, "id", "play").addEventListener("click", function(){
    //condition play and pause
    if (playPauseBtn.classList[1] === "fa-play"){
        audioTag.play()
        //change icon
        playPauseBtn.classList = "fa-solid fa-pause"
        setInterval(function(){
            //variable
            let progressPercent = (audioTag.currentTime / audioTag.duration) * 100
            current_time()
            selector_DOM(document, "class", "range", 0).style.width = progressPercent + "%"
        }, 1000)
    }else{
        audioTag.pause()
        //change icon
        playPauseBtn.classList = "fa-solid fa-play"
    }
})
//eventListener range slider
selector_DOM(document, "class", "range-slide", 0).addEventListener("click", function(e){
    selector_DOM(document, "class", "range", 0).style.width = e.offsetX + "px"
    audioTag.currentTime = (e.offsetX / this.clientWidth) * audioTag.duration
    current_time()
})
//eventListener next button
selector_DOM(document, "id", "next").addEventListener("click", next_previous_music)
//eventListener previous button
selector_DOM(document, "id", "previous").addEventListener("click", next_previous_music)
//eventListener end music
audioTag.addEventListener("ended", next_previous_music)
})()
