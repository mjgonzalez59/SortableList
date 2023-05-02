const createList = function(){
    [...narniaBooks]
        .map( a => ({value: a, sortedNumber: Math.random()}) )
        .sort((a, b) => a.sortedNumber - b.sortedNumber)
        .map(a => a.value)
        .forEach((book, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-index", index);
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="book-name">${book}</p>
                    <i class="fa-solid fa-grip-lines"></i>
                </div>
            `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListener();
}

const dragStart = function(){
    // console.log("Event: ", "dragstart");
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}
const dragOver = function(event){
    // console.log("Event: ", "dragover");
    this.classList.add("over");
    event.preventDefault();
}
const dragDrop = function(){
    // console.log("Event: ", "drop");
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove("over");
}
const dragEnter = function(){
    // console.log("Event: ", "dragenter");
}
const dragLeave = function(){
    // console.log("Event: ", "dragleave");
    this.classList.remove("over");
}

const swapItems = function(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

const addEventListener = function(){
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave);
    });
}

const checkOrder = function(){
    listItems.forEach((listItem, index) => {
        const bookName = listItem.querySelector(".draggable").innerText.trim();
        if(bookName !== narniaBooks[index]){
            listItem.classList.add("wrong");
        }else{
            listItem.classList.remove("wrong")
            listItem.classList.add("right");
        }
    });
}



const draggable_list = document.getElementById("draggable-list");
const check_btn = document.getElementById("check-btn");

const narniaBooks = [
    "The Magician's Nephew",
    "The Lion, The Witch and The Wardrobe",
    "Prince Caspian",
    "The Voyage of the Dawn Treader",
    "The Silver Chair",
    "The Horse and His Boy",
    "The Last Battle",
]

const listItems = [];

let dragStartIndex;

createList();

check_btn.addEventListener("click", checkOrder);




