const balance = document.getElementById("balance");
const money_plus = document.getElementById("money_plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.getElementById("money_minus");

const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions =
     localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e){
    e.preventDefault();
    if (text.value.trim() ==="" || amount.value.trim() === ""){
        text.placeholder = "please add a text";
        text.style.backgroundColor = "#ccc";
        amount.placeholder = "please add amount";
        amount.style.backgroundColor = "#ccc";
    } else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}

//generate id
function generateID(){
    return Math.floor(Math.random() * 100000000);
}

//add transaction to dom list
function addTransactionDOM(transaction){
    //get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    //add class base on the value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item. innerHTML = `${transaction.text} <span>${Math.abs(transaction.amount)} </span> 
    <button class= "delete-btn" onclick ="removeTransaction(${transaction.id})">
    x</button>`;
    list.appendChild(item);
}

//update the balance
function updateValues(){
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) =>(acc +=item), 0).toFixed(2);
    const income = amounts
        .filter((item) => item > 0)
        .reduce((acc,item) =>(acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts.filter((item) => item < 0). reduce((acc,item) =>(acc +=item), 0)*
        -1
    ).toFixed(2);

    balance.innerText = `N${total}`;
    money_plus.innerText = `N${income}`;
    money_minus.innerText = `N${expense}`;
}

//remove
function removeTransaction(id){
    transactions = transactions.filter((transaction) =>transaction.id !== id);
    updateLocalStorage();
    init();
}

//updatelocal storage
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));

}

//init
function init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();

form.addEventListener("submit", addTransaction);