const textchange = document.getElementById("test2");

textchange.addEventListener("click", () => {
  if (textchange.innerText === "클릭되었습니다22") {
    textchange.innerText = "다시 초기화되었습니다22";
  } else {
    textchange.innerText = "클릭되었습니다22";
  }
});
