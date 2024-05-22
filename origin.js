import style from "./leftside.css";
import style2 from "./rightside.css";
import style3 from "./search.css";

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
    console.log(title);
    const content = data.content;
    console.log(content);
    const writer = data.writer;
    console.log(writer);

    console.log(data.id);

    const info = document.createElement("p");
    info.id = "info-p";

    const titleDiv = document.createElement("div");
    titleDiv.id = "title-div";
    const writerDateDiv = document.createElement("div");
    writerDateDiv.id = "writerDateDiv-div";
    const profileImg = document.createElement("img");
    profileImg.id = "profileImg-img";
    profileImg.src = "./프로필아이콘.png";
    const writerDiv = document.createElement("div");
    writerDiv.id = "writerDiv-div";
    const contentDiv = document.createElement("div");
    contentDiv.id = "contentDiv-div";

    titleDiv.innerText = `${title}`;
    writerDiv.innerText = `${writer}`;
    contentDiv.innerText = `${content}`;

    info.appendChild(titleDiv);
    writerDateDiv.appendChild(profileImg);
    writerDateDiv.appendChild(writerDiv);
    info.appendChild(writerDateDiv);
    info.appendChild(contentDiv);

    // 작성된 글의 비밀번호, 버튼
    const deleteContainer = document.createElement("div");
    const passwordInput = document.createElement("input");
    const deleteBtnInput = document.createElement("input");

    passwordInput.placeholder = "비밀번호";
    passwordInput.id = "passwordInput";
    passwordInput.type = "password";
    passwordInput.required = true;
    deleteBtnInput.type = "submit";
    deleteBtnInput.id = "deleteBtn";

    deleteContainer.appendChild(passwordInput);
    deleteContainer.appendChild(deleteBtnInput);

    list.appendChild(info);
    list.appendChild(deleteContainer);
    showContainer.appendChild(list);

    deleteBtnInput.addEventListener("click", async () => {
      const password = passwordInput.value;
      await deleteItem(data.id, password);
    });
  });
}
request();

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (e) => {
  // submit 버튼을 눌렀을 때 reload되지 않도록 한다.
  e.preventDefault();
  const idInput = document.getElementById("searchId");
  const searchId = idInput.value;

  const searchURL = `${url}${searchId}/`;

  const response = await fetch(searchURL, {
    method: "GET",
  });

  const searchdatas = await response.json();
  console.log(searchdatas);
});

// POST
const form = document.getElementById("postForm");

form.addEventListener("submit", async (e) => {
  console.log(typeof form.password.value);
  console.log(form.password.value);

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
async function deleteItem(itemId, password) {
  console.log(itemId);
  console.log(password);

  const deleteURL = `${url}${itemId}/`;
  //URL에 요청을 보낸다.
  await fetch(deleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body로 FormData 객체를 전달해준다.
    body: JSON.stringify({ password: password }),
  });

  window.location.reload();
}
