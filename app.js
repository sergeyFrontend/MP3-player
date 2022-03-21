'use strict';
const player = document.querySelector('.player'),
     playBtn= document.querySelector('.play'),
     prevBtn =  document.querySelector('.prev'),
     nextBtn =  document.querySelector('.next'),
     audio = document.querySelector('.audio'),
     progressContainer = document.querySelector('.progress_container'),
     progress = document.querySelector('.progress'),
     cover = document.querySelector('.cover__img'),
     imgSrc = document.querySelector('.img__src'),
     title = document.querySelector('.song');

// названия песен
const songs =['Жмурки','GFY','Washing Machine Heart'];

// песня по умолчанию
let songIndex=0;

function loadSong(song){
  title.innerHTML= song;
  audio.src=`songs/${song}.mp3`;
  cover.src = `img/cover${songIndex+1}.svg`;
};

loadSong(songs[songIndex]);

// PLAY
function playSong(){
  player.classList.add('play');
  imgSrc.src ='./img/stop.svg';
  audio.play();
};

// PAUSE
function pauseSong(){
  player.classList.remove('play');
  imgSrc.src ='./img/play.svg';

  audio.pause();
};

playBtn.addEventListener('click',()=>{
  const isplay = player.classList.contains('play');
  if(isplay){
    pauseSong();
  }else{
    playSong()
  }
});


// Next song
 function nextSong(){
   songIndex++;

   if(songIndex > songs.length-1){
     songIndex=0;
   }

   loadSong(songs[songIndex]);
   playSong();
 }
 nextBtn.addEventListener('click',nextSong);

// Prev song
function prevSong(){
  songIndex--;

  if(songIndex<0){
    songIndex = songs.length -1;
  }

  loadSong(songs[songIndex]);
  playSong();

}
prevBtn.addEventListener('click',prevSong);


// Progress Bar

function updateProgress(e){
 const {currentTime,duration}=e.srcElement;
 const progressPresent = (currentTime/duration)*100;
 progress.style.width = `${progressPresent}%`
};

audio.addEventListener('timeupdate',updateProgress);


// progress song

function progressSong(e){
 const width = this.clientWidth;
 const clickX = e.offsetX;
 const duration = audio.duration;

 audio.currentTime =(clickX/width)*duration;
}

progressContainer.addEventListener('click',progressSong);

audio.addEventListener('ended',nextSong);