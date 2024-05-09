const filterData = () => {
  while (container.firstChild) {
    // 자식들이 모두 없어질때까지 반복 첫째가 사라지면 둘째가 첫째되고 이를 반복
    // 이를 통해 같은 내용이 반복해서 작성되는 것을 방지
    container.removeChild(container.firstChild);
  }
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response.frontend); // frontend의 값인 배열만 출력됨
      const datas = response.frontend;

      datas
        .filter((data) => data.role == "아기사자") // 중괄호 없이 하면 return문 필요 없이 자동적으로 return 된다
        .map((data) => {
          const list = document.createElement("div");
          list.innerHTML = `제 이름은 ${data.name}입니다
        저는 ${data.role}입니다. 그리고 제 전공은 ${data.major}입니다.`;

          container.appendChild(list);
          console.log(data);
        });
    });
};
