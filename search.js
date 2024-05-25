const searchForm = document.getElementById("searchForm");
const shadowContainer = document.getElementById("shadow-container");
const searchContainer = document.getElementById("search-container");
const body = document.querySelector("body");

const url = `http://byun-dding.kro.kr:8000/guestbooks/`;

searchForm.addEventListener("submit", async (e) => {
  // submit 버튼을 눌렀을 때 reload되지 않도록 한다.
  e.preventDefault();

  try {
    const idInput = document.getElementById("searchId");
    const searchId = idInput.value;
    idInput.value = "";

    const searchURL = `${url}${searchId}/`;
    const response = await fetch(searchURL, {
      method: "GET",
    });

    const searchdata = await response.json();
    if (response.status === 404) {
      alert("해당 id에 관한 글이 없습니다");
    } else {
      shadowContainer.classList.remove("hidden");
      searchContainer.innerHTML = "";

      const list = document.createElement("div");

      list.id = "searchlist"; // id를 추가하여 css가 적용되게 한다.

      const title = searchdata.title;
      console.log(title);
      const content = searchdata.content;
      console.log(content);
      const writer = searchdata.writer;
      console.log(writer);
      const writeDate = `${searchdata.created_at.substring(
        0,
        4
      )}.${searchdata.created_at.substring(
        5,
        7
      )}.${searchdata.created_at.substring(
        8,
        10
      )} ${searchdata.created_at.substring(
        11,
        13
      )}${searchdata.created_at.substring(13, 16)}`;

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

      list.appendChild(info);

      const xBtn = document.createElement("div");
      xBtn.innerText = "❌";
      xBtn.classList = "xBtn";

      xBtn.addEventListener("click", () => {
        shadowContainer.classList.add("hidden");
      });

      searchContainer.appendChild(xBtn);
      searchContainer.appendChild(list);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});
