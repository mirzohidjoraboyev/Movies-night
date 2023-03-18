let tv = new Swiper(`.trend__tv-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.trend__tv-slider .swiper-button-next`,
        prevEl: `.trend__tv-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});

let awaited = new Swiper(`.popular__actors-slider`, {
    slidesPerView: 1,
    spaceBetween: 27,
    // slidesPerGroup: 3,
    loop: true,
    // loopFillGroupWithBlank: true,
    navigation: {
        nextEl: `.popular__actors-slider .swiper-button-next`,
        prevEl: `.popular__actors-slider .swiper-button-prev`,
    },
    breakpoints: {
        1440: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        960: {
            slidesPerView: 4,
        },
        720: {
            slidesPerView: 3,
        },
        500: {
            slidesPerView: 2,
        },
    }
});


const searchLink = document.querySelector('.search__link .icon-reg'),
    mainContent = document.querySelector('.main__content'),
    mainClose = document.querySelectorAll('.main__close'),
    mainBlock = document.querySelector('.main__block'),
    mainSolo = document.querySelector('.main__solo'),
    moviesLink = document.querySelectorAll('.movies__link'),
    formMain = document.querySelector('.form__main'),
    headerInput = document.querySelector('.header__input'),
    anime = document.querySelector('.anime'),
    pagination = document.querySelector('.pagination'),
    headerBtn = document.querySelector('.header__btn'),
    headerAbs = document.querySelector('.header__abs'),
    headerItems = document.querySelector('.header__items');

/* menu bars */

headerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('active')
    headerItems.classList.toggle('active')
    headerAbs.classList.toggle('active')
    body.classList.toggle('active')
})

headerAbs.addEventListener('click', function (e) {
    if (e.target == e.currentTarget) {
        this.classList.remove('active')
        headerBtn.classList.remove('active')
        headerItems.classList.remove('active')
    }
})

/* menu bars */

/* host */

const host = "https://kinopoiskapiunofficial.tech";
const hostName = "X-API-KEY";
const hostValue = "bdc430de-3059-4625-9697-5d69046aee78"


class Kino {
    constructor () {
        this.date = new Date().getMonth()
        this.curYear = new Date().getFullYear()
        this.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        this.curMonth = this.months[this.date]
    }

    fOpen = async (url) => {
        let response = await fetch(url,{
            headers: {
                [hostName]: hostValue
            }
        })

        if(response.ok) return response.json()
        else throw new Error(`Cannot accsess to ${url}`)
    }

    getTopMovies = (page =1) => this.fOpen(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)
    getSoloFilm = (id) => this.fOpen(`${host}/api/v2.2/films/${id}`)
    getMostAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`)
    getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`)
    getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`)
    getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)

}

const db = new Kino()

db.getTopMovies().then(res =>{
    console.log(res);
})


/* host */

function renderTrendMovies(elem = [], fn = [], films = [], pages = []) {
    anime.classList.add('active')

    elem.forEach((item, i) => {
        let parent = document.querySelector(`${item} .swiper-wrapper` )
        db[fn[i]](pages[i]).then(data => {

            data[films[i]].forEach(el => {

                let slide = document.createElement('div')
                slide.classList.add('swiper-slide')

                slide.innerHTML = `
                <div class="movie__item">
                  <img src="${el.posterUrlPreview}" alt="${el.nameEn}" loading="lazy">
                </div>
                `
                parent.append(slide)
            });
            anime.classList.remove('active')
        })

        
    });
}


renderTrendMovies(['.trend__tv-slider','.popular__actors-slider'],['getTopMovies','getMostAwaited'],['films','releases'])




function randMovies(num) {
    return Math.trunc(Math.random() * num + 1)
}



function renderHeader (page) {
    db.getTopMovies(page).then(data => {
        console.log(data);

        let max = randMovies(data.films.length)
        let filmId = data.films[max].filmId
        let filmRating = data.films[max].rating

        db.getSoloFilm(filmId).then(response => {
            console.log(response);


            let headerText = document.querySelector(".header__text")
            headerText.innerHTML = `
            

            <h1 class="header__title">${response.nameRu || response.nameEn}</h1>
            <div class="header__balls">
                <span class="header__year">${response.year}</span>
                <span class="logo__span header__rating  header__year ">${response.ratingAgeLimits}+</span>
                <div class="header__seasons header__year">0+</div>
                <div class="header__stars header__year"><span class="icon-solid"></span><strong>${response.ratingKinopoisk}</strong></div>
            </div>
            <p class="header__descr">
                ${response.description}
            </p>
            <div class="header__buttons">
                <a href="#" class="header__watch"><span class="icon-solid"></span>watch</a>
                <a href="#" class="header__more header__watch movie__item" data-id="${response.filmId}">More information</a>
            </div>
            `
        })
    })
}

let page = 13
let rand = randMovies(page)
renderHeader(rand)