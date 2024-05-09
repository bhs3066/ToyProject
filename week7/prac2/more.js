const moreContainer = document.getElementById("container");

async function getMoreData() {
  const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${option.pageNo}&serviceKey=${option.serviceKey}`;

  count++;

  const fetchData = await fetch(url);
  console.log(fetchData);

  const toJson = await fetchData.json();
  console.log(toJson);

  const datas = await toJson.response.body.items.item;
  console.log(datas);

  datas.map((data, i) => {
    const list = document.createElement("div");
    list.id = "list"; // id를 추가하여 css가 적용되게 한다.

    // console.log(data.galCreatedtime);
    // console.log(typeof data.galCreatedtime); // 반환타입 = string(문자열)
    // console.log(data.galCreatedtime[0]);

    let date = data.galCreatedtime;
    date = `${date[2]}${date[3]}/${date[4]}${date[5]}/${date[6]}${date[7]}`;

    const image = document.createElement("img");
    image.src = data.galWebImageUrl;

    const info = document.createElement("span");
    info.innerText = `
    📌${i + 1 + 5 * count}번째 사진
    제목 : ${data.galTitle}
    장소 : ${data.galPhotographyLocation}
    날짜 : ${date}
    촬영자 : ${data.galPhotographer}
    키워드 : ${data.galSearchKeyword}
    `;

    list.appendChild(image);
    list.appendChild(info);

    moreContainer.appendChild(list);
  });
}

getMoreData();
