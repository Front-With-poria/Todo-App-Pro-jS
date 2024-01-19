
let changeThemeBtn = document.querySelector(".Switcher-theme")
let Body = document.querySelector("body");
let addBtn = document.querySelector(".add")
let userInput = document.querySelector(".user")
let ul = document.querySelector("ul")
const notiBox = document.createElement("div")


function main() {

    // ...................Change Theme Start ...........................

    changeThemeBtn.addEventListener("click", () => {
        Body.classList.toggle("LightkMode")
        const themeImg = changeThemeBtn.children[0]
        themeImg.setAttribute("src",

            themeImg.getAttribute("src") === "./Image/Day Icon Mode.png" ?
                "./Image/Night Icon Mode.png" : "./Image/Day Icon Mode.png"
        )

    })

    ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("card") && !e.target.classList.contains("dragStart")) {
            const dragingCard = document.querySelector(".dragStart")
            const cards = [...ul.querySelectorAll(".card")]
            const currentPos = cards.indexOf(dragingCard)
            const newPos = cards.indexOf(e.target)

            if (currentPos > newPos) {
                ul.insertBefore(dragingCard, e.target)
            } else {
                ul.insertBefore(dragingCard, e.target.nextSibling)
            }

            const todos = JSON.parse(localStorage.getItem("todos"))
            const removePos = todos.splice(currentPos , 1)
            todos.splice(newPos , 0 , removePos[0])
            localStorage.setItem("todos", JSON.stringify(todos))
        }
    })

    // ...................  Change Theme End ...........................

    // ..........  inputValidation , Save to Localstorage Start..........

    addBtn.addEventListener("click", () => {
        const item = userInput.value.trim()
        if (item === "") {
            alert("err")
        }
        else if (item) {
            userInput.value = ""
            const todos = !localStorage.getItem("todos") ? []
                : JSON.parse(localStorage.getItem("todos"))

            const currentTodo = {
                item: item,
                isCompleted: false
            }

            todos.push(currentTodo)
            localStorage.setItem("todos", JSON.stringify(todos))
            makeTodoElement([currentTodo])
        }

    })

    // ..........  inputValidation , Save to Localstorage End..........


}

document.addEventListener("DOMContentLoaded", main);

function removed(index) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1)
    localStorage.setItem("todos", JSON.stringify(todos));
}


function stateTodo(index, isComplete) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].isCompleted = isComplete;
    localStorage.setItem("todos", JSON.stringify(todos));
}


function makeTodoElement(todoArray) {

    if (!todoArray) {
        return null;
    }

    const conter = document.querySelector(".poria")
    const clr = document.querySelector(".clr")


    todoArray.forEach(elem => {

        // .......... Creat Element Html Sample ............

        const card = document.createElement("li")
        const text = document.createElement("p")
        const clearBtn = document.createElement("span")
        const clearBtnIcon = document.createElement("img")
        const cbContainer = document.createElement("div")
        const cbChecked = document.createElement("input")
        const checked = document.createElement("span")
        const cardOptions = document.createElement("div")
        const sortIcon = document.createElement("img")


        card.appendChild(text)
        card.appendChild(clearBtn)
        card.appendChild(cbContainer)
        card.appendChild(cardOptions)
        cardOptions.appendChild(clearBtn)
        cardOptions.appendChild(cbContainer)
        clearBtn.appendChild(clearBtnIcon)
        cbContainer.appendChild(cbChecked)
        cbContainer.appendChild(checked)
        cardOptions.appendChild(sortIcon)
        Body.appendChild(notiBox)


        ul.appendChild(card)

        // ....................add Classlist.....................

        ul.classList.add("todos")
        card.classList.add("card")
        text.classList.add("item")
        cbContainer.classList.add("cb-container")
        clearBtn.classList.add("clearBtn")
        cardOptions.classList.add("cardOptionsStyle")


        // ....................add Attrbuit.....................

        card.setAttribute("draggable", true)
        cbChecked.setAttribute("type", "checkbox")
        sortIcon.setAttribute("src", "./Image/Sort Icon Day Light.png")
        clearBtnIcon.setAttribute("src", "./Image/close_FILL0_wght400_GRAD0_opsz24.png")
        text.innerHTML = elem.item;

        if (elem.isCompleted) {
            card.classList.add("cheched")
            cbChecked.setAttribute("checked", "checked")
        }

        // ....................add Events.....................

        card.addEventListener("dragstart", () => {
            card.classList.add("dragStart")
        })

        card.addEventListener("dragend", () => {
            card.classList.remove("dragStart")
        })

        clearBtn.addEventListener("click", (e) => {
            const currentCardC = clearBtn.parentElement.parentElement;
            currentCardC.classList.add("delet")

            const noti = document.createElement("span")
            const notiIcon = document.createElement("img")
            const title = document.createElement("p")
            noti.appendChild(title)
            notiBox.appendChild(noti)
            noti.appendChild(notiIcon)
            notiIcon.setAttribute("src", "./Image/Info Icon Dark mode.png")
            title.classList.add("ClearTitle")
            notiBox.classList.add("notiBox")
            noti.classList.add("notiD")

            title.innerHTML = elem.item + " " + "با موفقیت حذف شد"

            setTimeout(() => {
                noti.classList.remove("notiD")
                title.remove()
                notiIcon.remove()
            }, 3900);
            const indexOfCurrentCard = [...document.querySelectorAll(".todos .card")]
                .indexOf(currentCardC)
            removed(indexOfCurrentCard)
        })


        cbChecked.addEventListener("click", (e) => {
            const currentCard = cbChecked.parentElement.parentElement.parentElement;
            const checked = cbChecked.checked;
            const currentCardIndex = [...document.querySelectorAll(".todos .card")]
                .indexOf(currentCard)
            stateTodo(currentCardIndex, checked)

            checked ? currentCard.classList.add("cheched") : currentCard.classList.remove("cheched")
        });

    });


    conter.textContent = document.querySelectorAll(".todos .card:not(.cheched)").length + " " + "وظایف انجام شده"
    clr.textContent = JSON.parse(localStorage.getItem("todos")).length + " " + "تعداد کل وظایف"
}
makeTodoElement(JSON.parse(localStorage.getItem("todos")));






