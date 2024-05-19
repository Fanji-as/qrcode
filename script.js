const wrapper = document.querySelector(".wrapper"),
  qrInput = wrapper.querySelector(".form input"),
  generateButton = wrapper.querySelector(".form button"),
  qrImg = wrapper.querySelector(".qr-code img"),
  countdown = wrapper.querySelector(".countdown");
let preValue = "";

generateButton.addEventListener("click", () => {
  let qrValue = qrInput.value.trim();
  if (!qrValue || preValue === qrValue) return;
  preValue = qrValue;
  generateButton.innerText = "Generating QR Code";
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?data=${qrValue}&size=200x200`;
  qrImg.addEventListener("load", () => {
    wrapper.classList.add("active");
    generateButton.innerText = "Generate QR Code";

    let secondsLeft = 30;
    countdown.innerText = `QR Code will disappear in ${secondsLeft} seconds`;

    const countdownInterval = setInterval(() => {
      secondsLeft--;
      countdown.innerText = `QR Code will disappear in ${secondsLeft} seconds`;
      if (secondsLeft === 0) {
        clearInterval(countdownInterval);
        wrapper.classList.remove("active");
        preValue = "";
        countdown.innerText = "";
      }
    }, 1000);
  });
});

qrInput.addEventListener("keyup", () => {
  if (!qrInput.value.trim()) {
    wrapper.classList.remove("active");
    preValue = "";
  }
});