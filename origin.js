import style from "./leftside.css";
import style2 from "./rightside.css";
import style3 from "./search.css";
import searchJs from "./search.js";

const url = `http://byun-dding.kro.kr:8000/guestbooks/`;

// GET 그냥 전체를 조회하는 GET 바로 실행됨
async function request() {
  const response = await fetch(url, {
    method: "GET",
  });
  const datas = await response.json();
  console.log(datas);

  const showContainer = document.getElementById("show-container");

  datas.map((data, i) => {
    const list = document.createElement("div");

    list.id = "list"; // id를 추가하여 css가 적용되게 한다.

    const title = data.title;

    const content = data.content;

    const writer = data.writer;

    const writeDate = `${data.created_at.substring(
      0,
      4
    )}.${data.created_at.substring(5, 7)}.${data.created_at.substring(
      8,
      10
    )} ${data.created_at.substring(11, 13)}${data.created_at.substring(
      13,
      16
    )}`;

    const info = document.createElement("p");
    info.id = "info-p";

    const titleDiv = document.createElement("div");
    titleDiv.id = "title-div";
    const writerContainerDiv = document.createElement("div");
    writerContainerDiv.id = "writerContainerDiv-div";
    const profileImg = document.createElement("img");
    profileImg.id = "profileImg-img";
    profileImg.src = "./프로필아이콘.png";
    const writerDateDiv = document.createElement("div");
    writerDateDiv.id = "writerDateDiv-div";
    const writerDiv = document.createElement("div");
    writerDiv.id = "writerDiv-div";
    const dateDiv = document.createElement("div");
    dateDiv.id = "dateDiv-div";
    const contentDiv = document.createElement("div");
    contentDiv.id = "contentDiv-div";

    titleDiv.innerText = `${title}`;
    writerDiv.innerText = `${writer}`;
    contentDiv.innerText = `${content}`;
    dateDiv.innerText = `${writeDate}`;

    info.appendChild(titleDiv);
    writerContainerDiv.appendChild(profileImg);
    writerContainerDiv.appendChild(writerDateDiv);
    writerDateDiv.appendChild(writerDiv);
    writerDateDiv.appendChild(dateDiv);
    info.appendChild(writerContainerDiv);
    info.appendChild(contentDiv);

    // 작성된 글의 비밀번호, 버튼
    const deleteContainer = document.createElement("div");
    const passwordInput = document.createElement("input");
    const deleteBtnInput = document.createElement("input");

    deleteContainer.id = "deleteContainer";
    passwordInput.placeholder = "비밀번호";
    passwordInput.classList = "passwordInput";
    passwordInput.type = "password";
    passwordInput.required = true;
    deleteBtnInput.type = "submit";
    deleteBtnInput.id = "deleteBtn";
    deleteBtnInput.value = "삭제";

    deleteContainer.appendChild(passwordInput);
    deleteContainer.appendChild(deleteBtnInput);

    list.appendChild(info);
    list.appendChild(deleteContainer);
    showContainer.appendChild(list);

    deleteBtnInput.addEventListener("click", async () => {
      const password = passwordInput.value;
      await deleteItem(data.id, password, passwordInput);
    });
  });
}
request();

// POST
const form = document.getElementById("postForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    password: form.password.value,
    title: form.title.value,
    content: form.content.value,
    writer: form.writer.value,
  };

  //URL에 요청을 보낸다.
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body로 FormData 객체를 전달해준다.
    body: JSON.stringify(formData),
  });

  window.location.reload();
});

// DELETE
async function deleteItem(itemId, password, passwordInput) {
  //passwordInput 을 받아서 오류처리하고 다시 입력창을 비운다

  const deleteURL = `${url}${itemId}/`;
  //URL에 요청을 보낸다.
  try {
    const response = await fetch(deleteURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body로 FormData 객체를 전달해준다.
      body: JSON.stringify({ password: password }),
    });

    if (response.status === 403) {
      alert("Wrong Password!!!");
      passwordInput.value = "";
    } else if (response.ok) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
