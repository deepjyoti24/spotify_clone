console.log("Welcom to Spotify");
//initiallize thr vriables

let songIndex=0;
let volume_slider= document.querySelector(".volume_slider");
let audioelement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gift = document.getElementById('gift');
let masterSongname = document.getElementById('masterSongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Night Changes", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Closer", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
    {songName: "Naikhatra", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
    {songName: "I Can Fly", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
    {songName: "Steel My Girl", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
    {songName: "Dark Side", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"}
]

songItems.forEach((element, i) => {
    
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
   // element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


//handle paly paus click
masterPlay.addEventListener('click', ()=>{
    if (audioelement.paused || audioelement.currentTime<=0) {
        audioelement.play();
        
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gift.style.opacity=1;
        masterSongname.style.opacity=1;
        
    }
    else
    {
        audioelement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gift.style.opacity=0;
        masterSongname.style.opacity=0;
    }
})

//listen to events
audioelement.addEventListener('timeupdate', ()=>{

    Progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    myprogressbar.value = Progress;

})
myprogressbar.addEventListener('change', ()=> {
    audioelement.currentTime = myprogressbar.value * audioelement.duration/100;
})

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    audioelement.volume = volume_slider.value / 100;
  }

const makeAllplay =()=>{
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllplay();
        gift.style.opacity=1;
        masterSongname.style.opacity=1;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle'); 
        e.target.classList.add('fa-pause-circle');
        audioelement.src =songs[songIndex].filepath;
        masterSongname.innerText=songs[songIndex].songName;
        audioelement.currentTime=0;
        audioelement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
 
    })
});

document.getElementById('next').addEventListener('click', ()=> {
    if(songIndex>=9)
    {
        songIndex=0;
    }
    else
    {
        songIndex+=1;
    }
    
    audioelement.src =songs[songIndex].filepath;
    masterSongname.innerText=songs[songIndex].songName;
    audioelement.currentTime=0;
    audioelement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=> {
    if(songIndex<0)
    {
        songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    
    audioelement.src =songs[songIndex].filepath;
    masterSongname.innerText=songs[songIndex].songName;
    audioelement.currentTime=0;
    audioelement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
