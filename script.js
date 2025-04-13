window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';

let qrScanned = false;

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  console.log("Voice Command:", transcript);

  if (transcript.includes("open the curtains")) {
    openCurtains();
  }

  if (transcript.includes("yes we are ready") && qrScanned) {
    showGroupPhoto();
  }
};

recognition.start();

function openCurtains() {
  document.querySelector('.left-curtain').classList.add('open');
  document.querySelector('.right-curtain').classList.add('open');
  speak("Curtains opened. Welcome honorable judges and club members.");
  setTimeout(() => {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("judges-screen").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("judges-screen").classList.add("hidden");
      document.getElementById("qr-screen").classList.remove("hidden");
      speak("Please scan the QR code to continue.");
      setTimeout(() => {
        qrScanned = true;
        speak("Are you ready?");
      }, 3000);
    }, 4000);
  }, 3000);
}

function showGroupPhoto() {
  document.getElementById("qr-screen").classList.add("hidden");
  const body = document.querySelector("body");
  const photoScreen = document.createElement("section");
  photoScreen.classList.add("hero");
  photoScreen.innerHTML = \`
    <div class="content">
      <h1>Technical Team</h1>
      <img src="group_photo.jpg" alt="Technical Team" style="width: 300px; border-radius: 20px;"/>
      <p>This is the Technical Team of Vaish College of Engineering</p>
    </div>\`;
  body.appendChild(photoScreen);
  speak("This is the Technical Team of the Vaish College of Engineering. We are the best. Hum college ka naam roshan karenge ek din. Smiling.");
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  synth.speak(utterance);
}

barba.init({
  transitions: [
    {
      name: 'fade',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.5
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5
        });
      }
    }
  ]
});

document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero:not(.hidden)");
  if (!hero) return;

  const x = (window.innerWidth / 2 - e.pageX) / 25;
  const y = (window.innerHeight / 2 - e.pageY) / 25;

  hero.style.transform = \`rotateY(\${x}deg) rotateX(\${y}deg)\`;
});
