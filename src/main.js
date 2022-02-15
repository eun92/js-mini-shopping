// data fetch
function fetchData() {
  return fetch("data/items.json")
    .then((response) => response.json())
    .then((json) => json.items)
}

// list 보여주기
function displayItems(items) {
  const container = document.querySelector(".items")
  container.innerHTML = items.map((item) => createHTMLString(item)).join("")
}

// list item html 템플릿 생성
function createHTMLString(item) {
  return `
  <li class="item">
    <span class="material-icons-round icon-wish">
    favorite
    </span>
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">
    ${item.gender}, ${item.size}
    </span>
  </li>`
}

// 버튼 클릭 이벤트
function onClickButton(event, items) {
  const dataset = event.target.dataset
  const key = dataset.key
  const value = dataset.value

  if (key == null || value == null) return

  displayItems(items.filter((item) => item[key] === value))
}

// 이벤트 리스너 셋팅
function setEventListeners(items) {
  const logo = document.querySelector(".logo")
  const buttons = document.querySelector(".buttons")
  const iconWish = document.querySelectorAll(".icon-wish")

  logo.addEventListener("click", () => displayItems(items))
  buttons.addEventListener("click", (event) => onClickButton(event, items))

  for (var i = 0; i < iconWish.length; i++) {
    iconWish[i].addEventListener("click", (event) => onClickWish(event))
    console.log("ddd")
  }
}

// wish
function onClickWish(event) {
  event.target.classList.toggle("is-active")
}

// 함수 호출
fetchData()
  .then((items) => {
    displayItems(items)
    setEventListeners(items)
  })
  .catch((err) => {
    console.log(err)
  })
