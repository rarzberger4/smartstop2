window.addEventListener("load", function(){

    alert("Test1");
    let testButton = document.createElement("button");
    testButton.innerHTML = "Test";

    let main = document.getElementById("main");
    main.appendChild(testButton);

    testButton.addEventListener("click", function (event) {

        let test = document.createElement("h3");
        test.innerText= "Success";

        let body = document.getElementById("main");
        body.appendChild(test);






    });




});


