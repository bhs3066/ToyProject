"use strict";

(function () {
  var e;
  (e = document.getElementById("test")).addEventListener("click", function () {
    "클릭되었습니다" === e.innerText ? e.innerText = "다시 초기화되었습니다" : e.innerText = "클릭되었습니다";
  }), function () {
    var e = document.getElementById("test2");
    e.addEventListener("click", function () {
      "클릭되었습니다22" === e.innerText ? e.innerText = "다시 초기화되었습니다22" : e.innerText = "클릭되었습니다22";
    });
  }();
})();
