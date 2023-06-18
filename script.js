var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* AUDIO PLAYER */

const musicsData = [
    { title: "Running", artist: "Anjara", id: 1 },
    { title: "Rise again", artist: "Anjara", id: 2 },
    { title: "Comme si", artist: "Anjara", id: 3 },
    { title: "Au fil de l'eau", artist: "Anjara", id: 4 },
    { title: "Home", artist: "Anjara", id: 5 }
  ];
  
  const musicPlayer = document.querySelector("audio");
  const musicTitle = document.querySelector(".music-title")
  const artistName = document.querySelector(".artist-name")
  const thumbnail = document.querySelector(".thumbnail")
  const indexTxt = document.querySelector(".current-index")
  
  let currentMusicIndex = 1;
  
  function populateUI({title, artist}) {
    musicTitle.textContent = title;
    artistName.textContent = artist;
    thumbnail.src = `thumbs/${title}.jpg`;
    musicPlayer.src = `music/${title}.mp3`;
    indexTxt.textContent = `${currentMusicIndex}/${musicsData.length}`
  }
  
  populateUI(musicsData[currentMusicIndex - 1])
  
  const playBtn = document.querySelector(".play-btn");
  
  playBtn.addEventListener("click", handlePlayPause)
  
  function handlePlayPause(){
    if(musicPlayer.paused) play()
    else pause()
  }
  function play(){
    playBtn.querySelector("img").src = "images/pause-icon.svg";
    musicPlayer.play();
  }
  function pause(){
    playBtn.querySelector("img").src = "images/play-icon.svg";
    musicPlayer.pause();
  }
  
  const displayCurrentTime = document.querySelector(".current-time");
  const durationTime = document.querySelector(".duration-time");
  const progressBar = document.querySelector(".progress-bar");
  
  musicPlayer.addEventListener("loadeddata", fillDurationVariables)
  
  let current;
  let totalDuration;
  
  function fillDurationVariables(){
    current = musicPlayer.currentTime;
    totalDuration = musicPlayer.duration;
  
    formatValue(current, displayCurrentTime)
    formatValue(totalDuration, durationTime)
  }
  
  function formatValue(val, element){
    const currentMin = Math.trunc(val / 60);
    let currentSec = Math.trunc(val % 60);
  
    if(currentSec < 10) {
      currentSec = `0${currentSec}`
    }
  
    element.textContent = `${currentMin}:${currentSec}`
  }
  
  musicPlayer.addEventListener("timeupdate", updateProgress)
  
  function updateProgress(e) {
    current = e.srcElement.currentTime;
    formatValue(current, displayCurrentTime);
  
    // 10 / 100 = 0.1
    const progressValue = current / totalDuration;
    progressBar.style.transform = `scaleX(${progressValue})`
    
  }
  const musicTrack = document.querySelector("audio");
  
  const progressBarContainer = document.querySelector(".progress-container");
  
  progressBarContainer.addEventListener("click", setProgress)
  
  let rect = progressBarContainer.getBoundingClientRect();
  let width = rect.width;
  
  function setProgress(e){
    const x = e.clientX - rect.left;
  
    musicPlayer.currentTime = (x / width) * totalDuration;
  }
  
  const btnShuffle = document.querySelector(".shuffle");
  btnShuffle.addEventListener("click", switchShuffle)
  
  let shuffle = false;
  function switchShuffle(){
    btnShuffle.classList.toggle("active")
    shuffle = !shuffle;
  }
  
  
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  
  [prevBtn, nextBtn].forEach(btn => btn.addEventListener("click", changeSong))
  musicPlayer.addEventListener("ended", changeSong)
  
  function changeSong(e){
    if(shuffle) {
      playAShuffledSong();
      return;
    }
  
    e.target.classList.contains("next-btn") || e.type === "ended" ? currentMusicIndex++ : currentMusicIndex--;
  
    if(currentMusicIndex < 1) currentMusicIndex = musicsData.length;
    else if(currentMusicIndex > musicsData.length) currentMusicIndex = 1;
    
    populateUI(musicsData[currentMusicIndex - 1])
    play()
  }
  
  function playAShuffledSong(){
    const musicsWithoutCurrentSong = musicsData.filter(el => el.id !== currentMusicIndex); // toutes les musiques sauf celle en cours
    const randomMusic = musicsWithoutCurrentSong[Math.trunc(Math.random() * musicsWithoutCurrentSong.length)]; // musique au hasard
  
    currentMusicIndex = randomMusic.id; 
    populateUI(randomMusic);
    play()
  }