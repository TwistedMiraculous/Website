import { songs } from './data.js';

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

// Get DOM elements
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const musicName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const seekBar = document.querySelector('.seek-bar');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-duration');

// Function to load the current song
function loadSong(songIndex) {
    console.log('Loading song:', songIndex);
    const song = songs[songIndex];
    audio.src = song.path;
    musicName.textContent = song.name;
    artistName.textContent = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;
}

// Function to update the seek bar and time display
function updateSeekBar() {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
    songDuration.textContent = formatTime(audio.duration);
}

// Function to format time in MM:SS format
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load the first song
loadSong(currentSongIndex);

// Play/Pause button click event listener
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = "Play";
    } else {
        audio.play();
        playPauseBtn.textContent = "Pause";
    }
    isPlaying = !isPlaying;
});

// Previous button click event listener
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
});

// Next button click event listener
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
});

// Update the seek bar position when the user interacts with it
seekBar.addEventListener("input", () => {
    const seekTime = (audio.duration / 100) * seekBar.value;
    audio.currentTime = seekTime;
});

// Update the seek bar and time display as the song plays
audio.addEventListener("timeupdate", updateSeekBar);
