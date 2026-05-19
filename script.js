const events = {

  summer:{
    title:"☀️ החופש הגדול",
    date:"June 20, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },

  purim:{
    title:"🎭 פורים",
    date:"March 2, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1513151233558-d860c5398176"
  },

  hanukkah:{
    title:"🕎 חנוכה",
    date:"December 14, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1543589077-47d81606c1bf"
  },

  pesach:{
    title:"🍷 פסח",
    date:"April 1, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1519671482749-fd09be7ccebf"
  },

  shavuot:{
    title:"🧀 שבועות",
    date:"May 21, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1488477181946-6428a0291777"
  },

  roshHashana:{
    title:"🍎 ראש השנה",
    date:"September 11, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  },

  sukkot:{
    title:"🌿 סוכות",
    date:"September 16, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  }

};

let countdownInterval;
let isLoading = false;

/* טעינה */
function showLoadingBar(callback){

  if(isLoading) return;
  isLoading = true;

  const bar = document.getElementById("loadingBar");
  const screen = document.getElementById("loadingScreen");

  if(screen) screen.classList.add("active");

  let progress = 0;

  const interval = setInterval(()=>{

    progress += 5;

    if(bar) bar.style.width = progress + "%";

    if(progress >= 100){

      clearInterval(interval);

      setTimeout(()=>{

        if(screen){
          screen.classList.remove("active");
        }

        if(bar){
          bar.style.width = "0%";
        }

        isLoading = false;

        callback();

      },200);
    }

  },80);
}

/* פתיחת חג */
function openCountdown(eventName){

  const event = events[eventName];
  if(!event) return;

  showLoadingBar(()=>{

    clearInterval(countdownInterval);

    hideAllScreens();

    const screen = document.getElementById("countdownScreen");
    screen.classList.add("active");

    screen.style.backgroundImage = `url('${event.background}')`;
    screen.style.backgroundSize = "cover";
    screen.style.backgroundPosition = "center";

    document.getElementById("eventTitle").innerHTML = event.title;

    document.getElementById("message").innerHTML = "";

    document.getElementById("progressContainer").style.display = "block";
    document.getElementById("progressText").style.display = "block";

    startCountdown(event.date);

  });
}

/* יום הולדת */
function openBirthday(){

  clearInterval(countdownInterval);

  hideAllScreens();

  const screen = document.getElementById("birthdayScreen");
  screen.classList.add("active");

  screen.style.backgroundImage =
  "url('https://images.unsplash.com/photo-1464349095431-e9a21285b5f3')";

  screen.style.backgroundSize = "cover";
  screen.style.backgroundPosition = "center";

  document.getElementById("message").innerHTML = "";
}

/* התחלת ספירה */
function startCountdown(date){

  clearInterval(countdownInterval);

  countdownInterval = setInterval(()=>{

    updateCountdown(new Date(date));

  },1000);
}

/* עדכון זמן */
function updateCountdown(targetDate){

  const now = new Date().getTime();
  const target = targetDate.getTime();
  const distance = target - now;

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  const total = 365*24*60*60*1000;
  const passed = total - distance;

  let progress = (passed / total) * 100;

  if(progress < 0) progress = 0;
  if(progress > 100) progress = 100;

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").innerHTML =
  "🚀 " + progress.toFixed(1) + "% עבר";
}

/* חזרה */
function goHome(){

  clearInterval(countdownInterval);

  hideAllScreens();

  document.getElementById("homeScreen").classList.add("active");

  document.getElementById("message").innerHTML = "";
}

/* הסתרת מסכים */
function hideAllScreens(){

  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });
}

/* מצב יום/לילה */
const themeBtn = document.getElementById("themeToggle");
let dark = false;

themeBtn.onclick = ()=>{

  dark = !dark;

  document.body.classList.toggle("darkMode");

  themeBtn.innerHTML =
  dark ? "🌙 מצב לילה" : "☀️ מצב יום";   /* ✔ תיקון כאן */

};

/* יום הולדת שמור */
const savedBirthday = localStorage.getItem("birthday");

if(savedBirthday){
  document.getElementById("birthdayInput").value = savedBirthday;
}

/* חלקיקים */
function createParticles(){

  const particles = document.getElementById("particles");

  setInterval(()=>{

    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random()*100 + "%";
    p.style.animationDuration = (3 + Math.random()*5) + "s";

    particles.appendChild(p);

    setTimeout(()=>p.remove(),8000);

  },300);
}

createParticles();

/* preload לרקעים */
function preloadEventImages(){

  Object.values(events).forEach(event => {

    const img = new Image();
    img.src = event.background;

  });

}

preloadEventImages();