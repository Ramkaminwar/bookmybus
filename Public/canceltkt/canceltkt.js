function myFunction() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("user_name", document.querySelector("#name").value);
    urlencoded.append("phone_no", document.querySelector("#Phone_no").value);
    urlencoded.append("email", document.querySelector("#email").value);
    urlencoded.append("ticket_no", document.querySelector("#tktid").value);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
    };
    fetch("httP://localhost/Cancel_Ticket", requestOptions)
        .then((response) => response)
        .then((result) => {
            console.log(result.status);
            if (result.status === 500) {
                alert("Server Error Ocurred");
            } else if (result.status === 400) {
                alert("wrong details");
            } else {
                alert("Ticket Cancelled");
            }
        })
        .catch((error) => alert("Error Ocurred"));
}