/* ================= JS ================= */

const events = {

  summer:{
    title:"☀️ החופש הגדול",
    date:"June 20, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },

  purim:{
    title:"🎭 פורים",
    date:"March 23, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1513151233558-d860c5398176"
  },

  pesach:{
    title:"🍷 פסח",
    date:"April 22, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1519671482749-fd09be7ccebf"
  },

  shavuot:{
    title:"🧀 שבועות",
    date:"May 12, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1488477181946-6428a0291777"
  },

  hanukkah:{
    title:"🕎 חנוכה",
    date:"December 4, 2026 00:00:00",
    background:"https://images.unsplash.com/photo-1543589077-47d81606c1bf"
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
  },

  yomHaatzmaut:{
    title:"🇮🇱 יום העצמאות",
    date:"April 21, 2027 00:00:00",
    background:"https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
  }

};

let countdownInterval;
let isLoading = false;

const themeBtn =
document.getElementById(
"themeToggle"
);

let dark = false;

themeBtn.onclick = ()=>{

  dark = !dark;

  document.body.classList.toggle(
  "darkMode"
  );

  themeBtn.innerHTML =
  dark
  ? "☀️ מצב יום"
  : "🌙 מצב לילה";
};

function showLoadingBar(callback){

  if(isLoading) return;

  isLoading = true;

  const screen =
  document.getElementById(
  "loadingScreen"
  );

  const bar =
  document.getElementById(
  "loadingBar"
  );

  screen.classList.add(
  "active"
  );

  let progress = 0;

  const interval =
  setInterval(()=>{

    progress +=
    Math.random()*18;

    if(progress > 100){
      progress = 100;
    }

    bar.style.width =
    progress + "%";

    if(progress >= 100){

      clearInterval(interval);

      setTimeout(()=>{

        screen.classList.remove(
        "active"
        );

        bar.style.width = "0%";

        isLoading = false;

        callback();

      },200);
    }

  },40);
}

function openCountdown(eventName){

  const event =
  events[eventName];

  if(!event) return;

  showLoadingBar(()=>{

    clearInterval(
    countdownInterval
    );

    hideAllScreens();

    document.getElementById(
    "shabbatToggle"
    ).style.display =
    "none";

    document.getElementById(
    "progressContainer"
    ).style.display =
    "block";

    document.getElementById(
    "progressText"
    ).style.display =
    "block";

    const screen =
    document.getElementById(
    "countdownScreen"
    );

    screen.classList.add(
    "active"
    );

    screen.style.backgroundImage =
    `url('${event.background}')`;

    document.getElementById(
    "eventTitle"
    ).innerHTML =
    event.title;

    document.getElementById(
    "message"
    ).innerHTML = "";

    let target =
    new Date(event.date);

    const now =
    new Date();

    if(target < now){

      target.setFullYear(
      now.getFullYear()+1
      );
    }

    startCountdown(target);

  });
}

let shabbatMode =
"כניסת שבת";

function openShabbatCountdown(){

  clearInterval(
  countdownInterval
  );

  hideAllScreens();

  const screen =
  document.getElementById(
  "countdownScreen"
  );

  screen.classList.add(
  "active"
  );

  screen.style.backgroundImage =
  "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773')";

  document.getElementById(
  "eventTitle"
  ).innerHTML =
  "🕯️ שבת";

  document.getElementById(
  "shabbatToggle"
  ).style.display =
  "block";

  document.getElementById(
  "progressContainer"
  ).style.display =
  "none";

  document.getElementById(
  "progressText"
  ).style.display =
  "none";

  startShabbatCountdown();
}

document.getElementById(
"shabbatToggle"
).onclick = ()=>{

  if(
    shabbatMode ===
    "כניסת שבת"
  ){

    shabbatMode =
    "צאת שבת";

    document.getElementById(
    "shabbatToggle"
    ).innerHTML =
    "🌃 צאת שבת";
  }

  else{

    shabbatMode =
    "כניסת שבת";

    document.getElementById(
    "shabbatToggle"
    ).innerHTML =
    "🌅 כניסת שבת";
  }

  startShabbatCountdown();
};

function startShabbatCountdown(){

  clearInterval(
  countdownInterval
  );

  function updateShabbat(){

    const now =
    new Date();

    const currentDay =
    now.getDay();

    let target =
    new Date(now);

    if(
      shabbatMode ===
      "כניסת שבת"
    ){

      let daysUntilFriday =
      (5-currentDay+7)%7;

      if(
        currentDay === 5 &&
        now.getHours() >= 18
      ){

        daysUntilFriday = 7;
      }

      target.setDate(
      now.getDate() +
      daysUntilFriday
      );

      target.setHours(
      18,30,0,0
      );

      document.getElementById(
      "message"
      ).innerHTML =
      "🌅 כניסת שבת";
    }

    else{

      let daysUntilSaturday =
      (6-currentDay+7)%7;

      if(
        currentDay === 6 &&
        now.getHours() >= 19
      ){

        daysUntilSaturday = 7;
      }

      target.setDate(
      now.getDate() +
      daysUntilSaturday
      );

      target.setHours(
      19,30,0,0
      );

      document.getElementById(
      "message"
      ).innerHTML =
      "🌃 צאת שבת";
    }

    updateCountdown(
      target,
      true
    );
  }

  updateShabbat();

  countdownInterval =
  setInterval(()=>{

    updateShabbat();

  },1000);
}

function openBirthday(){

  clearInterval(
  countdownInterval
  );

  hideAllScreens();

  document.getElementById(
  "shabbatToggle"
  ).style.display =
  "none";

  document.getElementById(
  "birthdayScreen"
  ).classList.add(
  "active"
  );
}

function startBirthdayCountdown(){

  const input =
  document.getElementById(
  "birthdayInput"
  ).value;

  if(!input){

    alert(
    "❌ תבחר תאריך"
    );

    return;
  }

  localStorage.setItem(
  "birthday",
  input
  );

  const birthDate =
  new Date(input);

  const now =
  new Date();

  let nextBirthday =
  new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
    23,59,59
  );

  if(nextBirthday < now){

    nextBirthday =
    new Date(
      now.getFullYear()+1,
      birthDate.getMonth(),
      birthDate.getDate(),
      23,59,59
    );
  }

  hideAllScreens();

  const screen =
  document.getElementById(
  "countdownScreen"
  );

  screen.classList.add(
  "active"
  );

  screen.style.backgroundImage =
  "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d')";

  document.getElementById(
  "eventTitle"
  ).innerHTML =
  "🎂 יום ההולדת שלך";

  document.getElementById(
  "progressContainer"
  ).style.display =
  "block";

  document.getElementById(
  "progressText"
  ).style.display =
  "block";

  document.getElementById(
  "message"
  ).innerHTML = "";

  startCountdown(
  nextBirthday
  );
}

function startCountdown(target){

  clearInterval(
  countdownInterval
  );

  updateCountdown(target);

  countdownInterval =
  setInterval(()=>{

    updateCountdown(target);

  },1000);
}

function updateCountdown(
  targetDate,
  isShabbat = false
){

  const now =
  new Date().getTime();

  const target =
  targetDate.getTime();

  const distance =
  target - now;

  if(
    distance <= 0 &&
    !isShabbat
  ){

    clearInterval(
    countdownInterval
    );

    document.getElementById(
    "days"
    ).innerHTML = 0;

    document.getElementById(
    "hours"
    ).innerHTML = 0;

    document.getElementById(
    "minutes"
    ).innerHTML = 0;

    document.getElementById(
    "seconds"
    ).innerHTML = 0;

    document.getElementById(
    "message"
    ).innerHTML =
    "🎉 הגיע הזמן!";

    return;
  }

  const days =
  Math.floor(
  distance /
  (1000*60*60*24)
  );

  const hours =
  Math.floor(
  (distance %
  (1000*60*60*24)) /
  (1000*60*60)
  );

  const minutes =
  Math.floor(
  (distance %
  (1000*60*60)) /
  (1000*60)
  );

  const seconds =
  Math.floor(
  (distance %
  (1000*60)) / 1000
  );

  document.getElementById(
  "days"
  ).innerHTML = days;

  document.getElementById(
  "hours"
  ).innerHTML = hours;

  document.getElementById(
  "minutes"
  ).innerHTML = minutes;

  document.getElementById(
  "seconds"
  ).innerHTML = seconds;

  const total =
  365*24*60*60*1000;

  const passed =
  total - distance;

  let progress =
  (passed / total) * 100;

  if(progress < 0)
  progress = 0;

  if(progress > 100)
  progress = 100;

  document.getElementById(
  "progressBar"
  ).style.width =
  progress + "%";

  document.getElementById(
  "progressText"
  ).innerHTML =
  "🚀 " +
  progress.toFixed(1) +
  "% עבר";
}

function goHome(){

  clearInterval(
  countdownInterval
  );

  hideAllScreens();

  document.getElementById(
  "homeScreen"
  ).classList.add(
  "active"
  );

  document.getElementById(
  "shabbatToggle"
  ).style.display =
  "none";
}

function hideAllScreens(){

  document
  .querySelectorAll(".screen")
  .forEach(screen=>{

    screen.classList.remove(
    "active"
    );

  });
}

const savedBirthday =
localStorage.getItem(
"birthday"
);

if(savedBirthday){

  document.getElementById(
  "birthdayInput"
  ).value =
  savedBirthday;
}

function createParticles(){

  const particles =
  document.getElementById(
  "particles"
  );

  setInterval(()=>{

    const p =
    document.createElement(
    "div"
    );

    p.classList.add(
    "particle"
    );

    p.style.left =
    Math.random()*100 + "%";

    p.style.animationDuration =
    (3 + Math.random()*5)
    + "s";

    particles.appendChild(p);

    setTimeout(()=>{

      p.remove();

    },8000);

  },300);
}

createParticles();