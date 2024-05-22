"use strict";

(function () {
  var e, n;
  e = fetch("byun-dding.kro.kr:8000/guestbooks/"), console.log(e), (n = document.getElementById("test2")).addEventListener("click", function () {
    "클릭되었습니다22" === n.innerText ? n.innerText = "다시 초기화되었습니다22" : n.innerText = "클릭되었습니다22";
  });
})();
