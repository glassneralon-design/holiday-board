const events = {

  summer: {
    title: "☀️ החופש הגדול",
    date: "June 20, 2026 00:00:00",

    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },

  purim: {
    title: "🎭 פורים",
    date: "March 2, 2027 00:00:00",

    background:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176"
  },

  hanukkah: {
    title: "🕎 חנוכה",
    date: "December 14, 2026 00:00:00",

    background:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf"
  },

  pesach: {
    title: "🍷 פסח",
    date: "April 22, 2027 00:00:00",

    background:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
  },

  shavuot: {
    title: "🧀 שבועות",
    date: "May 21, 2026 00:00:00",

    background:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af"
  },

  roshHashana: {
    title: "🍎 ראש השנה",
    date: "September 11, 2026 00:00:00",

    background:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  }

};

let countdownInterval;

/* פתיחת חג */
function openCountdown(eventName) {

  const event = events[eventName];

  hideAllScreens();

  const screen =
    document.getElementById("countdownScreen");

  screen.classList.add("active");

  screen.style.backgroundImage =
    `url('${event.background}')`;

  document.getElementById("eventTitle")
    .innerHTML = event.title;

  startCountdown(event.date);

}

/* מסך יום הולדת */
function openBirthday() {

  hideAllScreens();

  document.getElementById("birthdayScreen")
    .classList.add("active");

}

/* ספירת יום הולדת */
function startBirthdayCountdown() {

  const input =
    document.getElementById("birthdayInput").value;

  if (!input) {

    alert("❌ תבחר תאריך");

    return;
  }

  const birthDate = new Date(input);

  const now = new Date();

  let nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  /* אם היום הולדת כבר עבר השנה */
  if (

    nextBirthday.getMonth() < now.getMonth()

    ||

    (
      nextBirthday.getMonth() === now.getMonth()

      &&

      nextBirthday.getDate() < now.getDate()
    )

  ) {

    nextBirthday = new Date(
      now.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );

  }

  hideAllScreens();

  const screen =
    document.getElementById("countdownScreen");

  screen.classList.add("active");

  screen.style.backgroundImage =
    "url('https://images.unsplash.com/photo-1464349095431-e9a21285b5f3')";

  document.getElementById("eventTitle")
    .innerHTML = "🎂 יום ההולדת שלך";

  startCountdown(nextBirthday);

}

/* חזרה לבית */
function goHome() {

  clearInterval(countdownInterval);

  hideAllScreens();

  document.getElementById("homeScreen")
    .classList.add("active");

}

/* הסתרת מסכים */
function hideAllScreens() {

  const screens =
    document.querySelectorAll(".screen");

  screens.forEach(screen => {

    screen.classList.remove("active");

  });

}

/* ספירה */
function startCountdown(date) {

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {

    const now = new Date().getTime();

    const target = new Date(date).getTime();

    const distance = target - now;

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days")
      .innerHTML = days;

    document.getElementById("hours")
      .innerHTML = hours;

    document.getElementById("minutes")
      .innerHTML = minutes;

    document.getElementById("seconds")
      .innerHTML = seconds;

    if (distance < 0) {

      clearInterval(countdownInterval);

      document.getElementById("message")
        .innerHTML = "🎉 האירוע התחיל! 🎉";

    } else {

      document.getElementById("message")
        .innerHTML = "";

    }

  }, 1000);

}