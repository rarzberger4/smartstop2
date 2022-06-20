function getPW(){
    const val = document.querySelector("input").value;
    console.log(val);
    const XHR = new XMLHttpRequest();
    // Set up our request
    XHR.open("put", "http://localhost:3000/user?pw="+val);

    // The data sent is what the user provided in the form
    XHR.send();
    alert("Password changed!");
    window.location.replace("/");
}

window.addEventListener( "load",  function () {
    function delUser() {
        const XHR = new XMLHttpRequest();

        XHR.addEventListener("load", function (event) {
            alert(event.target.responseText);
        });

        XHR.addEventListener("error", function (event) {
            alert('Oops! Something went wrong.');
        });

        // Set up our request
        XHR.open("delete", "http://localhost:3000/user");

        // The data sent is what the user provided in the form
        XHR.send();

    }




    // Access the form element...
    const form = document.getElementById("deleteUser");

    // ...and take over its submit event.
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        delUser();
        alert("User deleted");
        window.location.replace("/");
    });
} );
