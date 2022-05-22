import getAPIKEY from "./api";

const APIKEY = getAPIKEY();
const imgURL = 'https://image.tmdb.org/t/p/w500';

console.log(APIKEY)

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

function movieList(url, section){
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      response.results.forEach(el => {
        let movie = document.createElement('li')
        let movieDiv = document.createElement('div')
        let movieImg = document.createElement('img')
        let title = document.createElement('h4')
        let rate = document.createElement('span')

        movieImg.setAttribute('src', imgURL + el.backdrop_path)
        title.innerText = el.title
        rate.innerText = '★ ' + el.vote_average;

        movieDiv.appendChild(movieImg)
        movieDiv.appendChild(title)
        movieDiv.appendChild(rate)

        movie.appendChild(movieDiv)

        section.appendChild(movie)
      })
    })
}

const now_playingURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
const now_playing = document.querySelector('#now-playing')
movieList(now_playingURL, now_playing)

const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`
const popular = document.querySelector('#popular')
movieList(popularURL, popular)

const top_ratedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`
const top_rated = document.querySelector('#top-rated')
movieList(top_ratedURL, top_rated)

const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=1`
const upcoming = document.querySelector('#upcoming')
movieList(upcomingURL, upcoming)

const wrapper = document.querySelector('.swiper-wrapper')
const latestURL = `https://api.themoviedb.org/3/movie/latest?api_key=${APIKEY}&language=en-US`
fetch(now_playingURL, options)
  .then(res => res.json())
  .then(res => {
    console.log(res)
    res.results.forEach(el => {
      const movie = document.createElement('div')
      const movieImg = document.createElement('img')
      const title = document.createElement('h4')
      const rate = document.createElement('span')

      movieImg.setAttribute('src', imgURL + el.backdrop_path)
      title.innerText = el.title
      rate.innerText = el.vote_average

      movie.classList.add('swiper-slide')
      movie.appendChild(movieImg)
      movie.appendChild(title)
      movie.appendChild(rate)

      wrapper.appendChild(movie)
    })
  })
  .then(() => {
    console.log(wrapper.innerHTML)
    new Swiper('.swiper', {
      autoplay: {
        delay: 5000
      },
      loop: true,
      slidesPerView: 5,
      spaceBetween: 10,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }
    })
  })
