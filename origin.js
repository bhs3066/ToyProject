const textchange = document.getElementById("test");

textchange.addEventListener("click", () => {
  if (textchange.innerText === "클릭되었습니다") {
    textchange.innerText = "다시 초기화되었습니다";
  } else {
    textchange.innerText = "클릭되었습니다";
  }
});