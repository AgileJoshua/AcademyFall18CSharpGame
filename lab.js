
let el = document.querySelector("main div");

console.log(el);

el.addEventListener("click", function (event) {

    /* This is the timer */
    setTimeout(function () {

        console.log(event);
        let newDiv = document.createElement("div");

        el.appendChild(newDiv);
        newDiv.innerHTML = "<strong>VERY IMPORTANT!!!!!!!</strong>";
    }, 1000);


});

alert("before?");

window.alert = function (message) {
    console.log("ALERT!!!!!!! " + message);
};

alert("After!!!");