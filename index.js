const q = document.querySelector.bind(document)
const qa = document.querySelectorAll.bind(document)
gsap.registerPlugin(ScrollToPlugin,ScrollTrigger)


qa('.btn').forEach(item=>{
    var nav_gsap = gsap.timeline({
        duration:.3,
    })
    nav_gsap.to(item,{
        rotation:15,       
    })
    nav_gsap.to(item,{
        rotation:-15,
    })
    nav_gsap.to(item,{
        rotation:0,     
    })
    nav_gsap.pause()
    item.addEventListener('click',()=>{
        nav_gsap.restart()
    })
})



// body1

var body1_swiper = new Swiper('.body1-swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    breakpoints: {
        1: {
            slidesPerView: 1.2,
        },
        1080: {
            slidesPerView: 3,
        }
    }
})

// body2

var body2_swiper = new Swiper('.body2-swiper', {
    slidesPerView: 2,
    breakpoints: {
        1: {
            slidesPerView: 1.2,
        },
        1080: {
            slidesPerView: 2,
        }
    }
})
var body2_card_swiper = new Swiper('.body2-card-swiper', {
    loop:true,
    slidesPerView:4,
    speed:1000,
    grabCursor:true,
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },
    breakpoints:{
        1:{
            slidesPerView:1.2,
            centeredSlides:true,
            spaceBetween:10,
        },
        1080:{
            slidesPerView:4,
        }
    }
})


body2_btn.forEach((item, index) => {
    body2_swiper.appendSlide(`
    <div class="swiper-slide df jcc aic">
        <div id="${item}" class="eeee ${item === body2_click ? 'active' : ''} ${index === 0 ? 'body2-btn' : 'body2-btn2'}" onclick="body2_c(event)">
            <h1 class="f4 fw">${item}</h1>
        </div>
    </div>
    `)
})
gsap.to('.body2-btn', {
    y: 50,
    duration: 2,
    yoyo: true,
    repeat: -1,
    // ease: 'linear'
})
gsap.to('.body2-btn2', {
    y: -50,
    duration: 2,
    yoyo: true,
    repeat: -1,
    // ease: 'linear'
})


function mobile() {
    body2_card_swiper.removeAllSlides()
    mobile_data[body2_click].forEach((item, index) => {
        body2_card_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="card body2-card">
                <img src="${item.img}" alt="" class="card-img-top body2-card-img lightbox-click">
                <div class="card-body">
                    <h1 class="card-title fw text-center f5">${item.title}</h1>
                    <p class="f6 taj lep lh">${item.text}</p>
                </div>
            </div>
        </div>
        `)
    })
    var g = gsap.timeline()
    g.to('.body2-card-swiper', {
        autoAlpha: 0,
        duration: .3,  
    })
    g.fromTo('.body2-card-swiper', {autoAlpha: 0}, {
        autoAlpha: 1,
        duration: .3,
    })
    lightbox()
    body2_card_swiper.autoplay.start()
}
body2_card_swiper.el.addEventListener('mouseover',()=>{
    body2_card_swiper.autoplay.stop()    
})
body2_card_swiper.el.addEventListener('mouseout',()=>{
    body2_card_swiper.autoplay.start()
})

function body2_c(e) {
    body2_click = e.currentTarget.id
    qa('.eeee').forEach(item => {
        item.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
    mobile()
}
mobile()

gsap.from('.body2-card-swiper', {
    xPercent: 100,
    scrollTrigger: {
        trigger: '#body2',
        start: '20% center',
        end: '30% center',
        scrub: 1,
        // markers:true
    }
})


// body3

var body3_swiper = new Swiper('.body3-swiper', {
    slidesPerView: 3,
    grabCursor: true,
    centeredSlides:true,
    speed:1000,
    effect:'coverflow',
    coverflowEffect:{
        rotate:0,
        stretch:10,
        depth:200,
        modifier:1,
        slideShadows:false,
    },
    breakpoints: {
        1: {
            slidesPerView: 1.5,
            spaceBetween: 50,
            coverflowEffect:{
                rotate:0,
                stretch:0,
                depth:50,
                modifier:1,
                slideShadows:false,
            },
        },
        1080: {
            slidesPerView: 3
        }
    },
    navigation: {
        nextEl: '.body3-next',
        prevEl: '.body3-prev',
    },
})



body3_data.forEach((item, index) => {
    body3_swiper.appendSlide(`
    <div class="swiper-slide">
        <div class="card body3-card">
            <div class="row">
                <div class="col-lg-6 p-0 position-relative">
                    <img src="${item.img}" alt="" class="body3-card-img">
                    <div class="body3-hover">
                        <div class="body3-img-btn">
                            <img src="./image/shearch.png" alt="" class="swe">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 text-light df jcc aic body3-right">
                    <div class="card-body">
                        <h1 class="card-title f3 fw text-center pb-3" style="border-bottom: 3px solid #fff;">${item.title}</h1>
                        <p class="card-text f6 lep lh">${item.text}</p>
                        <div class="df jcb aic">
                            <p class="card-text f6 m-0">${item.text2}</p>
                            <button class="btn body3-submit lep" onclick="add(1,${index})">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)
})


var sss = 0
const shop_modal = new bootstrap.Modal('#shop')
var shop_index = null
function add(n, ind) {
    if (log != 1) {
        sss = 1
        shop_index = ind
        q('.nav-login').click()
    }else{
        shop_modal.show()
        body3_data[ind].amount = Math.max(0, body3_data[ind].amount + n)
        total_price = 150
        q('#shop .modal-body').innerHTML = ''
        body3_data.forEach((item, index) => {
            if (item.amount != 0) {
                q('#shop .modal-body').innerHTML += `
                    <div class="card my-2">
                        <div class="row">
                            <div class="col-3">
                                <img src="${item.img}" alt="" class="shop-img">
                            </div>
                            <div class="col-9">
                                <div class="card-body">
                                    <div class="df jcb aic">
                                        <h1 class="card-title f5 fw">${item.title}</h1>
                                        <p class="f7">${item.text2}</p>
                                    </div>
                                    <div class="df jcb aic">
                                        <div class="df jca aic">
                                            <button class="btn shop-btn me-2" type="button" onclick="add(-1,${index})">-</button>
                                            <input type="text" class="shop-input text-center" value="${item.amount}" disabled>
                                            <button class="btn shop-btn mx-2" type="button" onclick="add(1,${index})">+</button>
                                        </div>
                                        <div>
                                            <p class="f6 fw m-0">NT$<span class="fw shop-price">${item.price * item.amount}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                total_price += item.price * item.amount
                }
            })
            if (q('#shop .modal-body').innerHTML == '') {
                setTimeout(() => {
                    q('#shop .modal-body').innerHTML = '<h1 class="f5 fw text-center">您尚未訂購商品</h1>'
                    q('.nav-shop-amount').classList.remove('active')
                }, 200);
            }
            q('.nav-shop-amount').classList.add('active')
            q('.total-price').innerText = total_price
    }
}

function shop_submit() {
    if (q('.total-price').innerText != '150') {
        alert('訂單已送出，感謝您的訂購，訂單訊息將以電子郵件通知您')
        body3_data.map(x => x.amount = 0)
        q('#shop .modal-body').innerHTML = '<h1 class="f5 fw text-center">您尚未訂購商品</h1>'
        q('.nav-shop-amount').classList.remove('active')
        shop_modal.hide()
        add(0,0)
    } else {
        alert('您尚未訂購商品')
    }
}


// body4

Chart.defaults.font.size = 18
Chart.defaults.color = '#79BA78'
var body4_chart = new Chart(q('#body4-chart'), {
    type: 'doughnut',
    data: {
        labels: ['苦甜巧克力', '戀戀草莓', '蘭姆葡萄', '經典香草',],
        datasets: [{
            label: '喜愛度',
            data: [20, 25, 25, 30],
            backgroundColor: [
                '#79BA78',
                '#E9B824',
                '#FF8080',
                '#6699E9'
            ]
        }]
    }
})

// body5

var body5_swiper = new Swiper('.body5-swiper', {
    slidesPerView: 1.5,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.body5-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.body5-swiper-next',
        prevEl: '.body5-swiper-prev',
    }
})

var mess_data = []

function mess_submit(e) {
    if (q('.body5-right input') != '') {
        e.preventDefault()
        alert('感謝您的留言，已為您送到後端')
        mess_data.push({
            name: q('.mess-name').value,
            email: q('.mess-email').value,
            text: q('.mess-text').value,
        })
        localStorage.setItem('mess-data', JSON.stringify(mess_data))
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="forum-name f5 fw">${q('.mess-name').value}</h1>
                    <p class="text-end">${q('.mess-email').value}</p>
                </div>
                <div class="forum-content p-3 w-100">
                    <p class="f7 taj lep">
                    ${q('.mess-text').value}
                    </p>
                </div>
            </div>
        </div>
        `)
        q('.mess-name').value = ''
        q('.mess-email').value = ''
        q('.mess-text').value = ''
        body5_swiper.slideTo(body5_swiper.slides.length - 1, 0)
        body5_swiper.autoplay.start()
    }
}
window.addEventListener('load', () => {
    var loca_data = JSON.parse(localStorage.getItem('mess-data')) || []
    loca_data.forEach(item => {
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="forum-name f5 fw">${item.name}</h1>
                    <p class="text-end">${item.email}</p>
                </div>
                <div class="forum-content p-3 w-100">
                    <p class="f7 taj lep">
                    ${item.text}
                    </p>
                </div>
            </div>
        </div>
        `)
    })
    mess_data = mess_data.concat(loca_data)
})

// 

function lightbox() {
    qa('.lightbox-click').forEach(item => {
        item.addEventListener('click', (e) => {
            q('.lightbox-img').src = e.currentTarget.src
            q('#lightbox').style.display = "flex"
            document.body.style.overflowY = "hidden"
            gsap.fromTo('#lightbox', {autoAlpha:0}, {
                autoAlpha: 1,
                duration: .5,
            })
            body2_card_swiper.autoplay.stop()
        })
    })
}
q('#lightbox').addEventListener('mouseover',()=>{
    body2_card_swiper.autoplay.stop()
})
q('.lightbox-x').addEventListener('click',()=>{
    body2_card_swiper.autoplay.start()
})
q('#lightbox').addEventListener('click', () => {
    body2_card_swiper.autoplay.start()
    gsap.to('#lightbox', {
        autoAlpha: 0,
        duration: .5,
        onComplete: () => {
            q('#lightbox').style.display = "none"
        },
    })
    document.body.style.overflowY = "auto";    
})
qa('.swe').forEach((item,index)=>{
    item.addEventListener('click',()=>{
        q('.lightbox-img').src = body3_data[index].img
        q('#lightbox').style.display = "flex"
        document.body.style.overflowY = "hidden"
        gsap.fromTo('#lightbox', {autoAlpha:0}, {
            autoAlpha: 1,
            duration: .5,
        })
    })
})


// 
var log = 0
const login_modal = new bootstrap.Modal('#login')
const logout_modal = new bootstrap.Modal('#logout')

q('.nav-login').addEventListener('click', () => {
    if (log === 0) {
        qa('#login input').forEach(element => {
            element.value = ''
        })
        login_modal.show()
    }else{
        logout_modal.show()
    }
})

function login() {
    q('.nav-login').innerHTML += '<span class="color2 fw f8">B034</span>'
    log = 1
    if (sss != 1) {
        logout_modal.show()   
    } else if(shop_index != null) {
        add(1,shop_index)
    }
    
}
function logout() {
    q('.nav-login').innerHTML = '<img src="./image/nav-login.png" alt="" class="nav-icon">'
    log = 0
    q('.nav-login').click()
    sss = 0
}

var s = 'sun'
const color_data = {
    sun: {
        '--bg--color': '#79BA78',
        '--bg--color2': '#E9B824',
        '--body--bg': '#fff',
        '--body--color': '#000',
    },
    moon: {
        '--bg--color': '#E9B824',
        '--bg--color2': '#79BA78',
        '--body--bg': '#5d5d5d',
        '--body--color': '#fff',
    },
}
function sun() {
    if (s === 'sun') {
        s = 'moon'
        q('.nav-sun').src = './image/nav-moon.png'
    } else {
        s = 'sun'
        q('.nav-sun').src = './image/nav-sun.png'
    }
    for (let key in color_data[s]) {
        document.documentElement.style.setProperty(key, color_data[s][key])
    }
}


var rrr = 0
q('.robot-btn').addEventListener('click', () => {
    q('.robot-box').classList.toggle('active')
    q('.robot-btn img').src = ['./image/x.png', './image/robot.png'][rrr++ % 2]
    gsap.from('.robot-btn img', {
        autoAlpha: 0,
        duration: .3,
    })
})
function robot_submit() {
    if (q('.robot-input').value != '') {
        q('.robot-body').innerHTML += `
        <p class="df fdc jcc align-items-end">
            <span class="f7 fw text-dark">您</span>
            <span class="f8 mess2">${q('.robot-input').value}</span>
        </p>
        `
        let ans = '感謝您的問答，小寶將幫您通知網頁管理員為您回復'
        let x = Object.keys(robot_data).filter(k => q('.robot-input').value.includes(k))
        if(x.length){
            ans = robot_data[x].text
            gsap.to(window,{duration:0,scrollTo:`#${robot_data[x].href}`})
        }
        setTimeout(() => {
            q('.robot-body').innerHTML += `
            <p>
                <span class="f7 fw text-dark">小寶</span>
                <span class="f8 mess">${ans}</span>
            </p>
            `
            q('.robot-body').scrollTo({
                top: q('.robot-body').scrollHeight,
                behavior: 'smooth'
            })
        }, 500);
        q('.robot-input').value = ''
    }
}
q('.robot-input').addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        robot_submit()
    }
})

var f = 1
const fs_data = {
    '--fs--title': 80,
    '--fs--1': 70,
    '--fs--2': 60,
    '--fs--3': 50,
    '--fs--4': 40,
    '--fs--5': 30,
    '--fs--6': 23,
    '--fs--7': 20,
    '--fs--8': 17,
}

function fs() {
    f = f % 3 + 1
    for (let key in fs_data) {
        document.documentElement.style.setProperty(key, fs_data[key] + 3 * (f - 1) + 'px')
    }
    q('.fs-btn').innerText = 'A' + '+'.repeat(f - 1)
}

function r(item){
    gsap.from(item,{
        x:-50,
        autoAlpha:0,
        scrollTrigger:{
            trigger:item,
            start:'top 90%',
            end:'center 90%',
            toggleActions:"play none none reverse",
            // markers:true,
        }
    })
}
function r2(item){
    gsap.from(item,{
        x:50,
        autoAlpha:0,
        scrollTrigger:{
            trigger:item,
            start:'top 90%',
            end:'center 90%',
            toggleActions:"play none none reverse",
            // markers:true,
        }
    })
}

r(q('.title'))
r2(q('.title2'))
r(q('.title3'))
r2(q('.title4'))
r(q('.title5'))