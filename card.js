document.getElementById("cardDisk").addEventListener("click", () => {
    let doc = document.getElementById("cardDisk");
    let doc2 = document.getElementById("myCard");
    doc.classList.toggle("moved");
    doc2.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", () => {

    const card = document.getElementById("cardDisk");
    const form = document.getElementById("myCard");

    // Get card elements
    const cardNumber = document.getElementById("cardNumber");
    const cardName = document.getElementById("cardName");
    const cardMonth = document.getElementById("cardMonth");
    const cardYear = document.getElementById("cardYear");
    const errMsg = document.getElementById("errorMsg");

    // Get input elements
    const numberInput = document.getElementById("numberInput");
    const nameInput = document.getElementById("nameInput");
    const monthInput = document.getElementById("monthInput");
    const yearInput = document.getElementById("yearInput");
    const cvvPass = document.getElementById("cvvPass");

    // Update card number
    numberInput.addEventListener("input", () => {
        try {
            const value = numberInput.value;
            let fmtd = "";
            let count = 0;

            for (let i = 0; i < value.length; i++) {
                const char = value[i];

                if (char >= "0" && char <= "9") {

                    if (count === 16) break;

                    if (count > 0 && count % 4 === 0) {
                        fmtd += " ";
                    };

                    fmtd += char;
                    count++

                } else if (char === " ") {

                    continue;

                } else {
                    throw new Error("Please Enter Numbers only.");
                }

            };

            numberInput.value = fmtd;
            cardNumber.textContent = fmtd || "#### #### #### ####";
            errMsg.textContent = "";
            numberInput.classList.remove("error");


        } catch (error) {
            errMsg.textContent = error.message;
            errMsg.style.color = "red";
            numberInput.classList.add("error");

        }

    });

    // Update card name
    nameInput.addEventListener("input", () => {
        cardName.textContent = nameInput.value.toUpperCase() || "FULL NAME";
    });

    // Update card expiration month
    monthInput.addEventListener("change", () => {
        cardMonth.textContent = monthInput.value !== "MM" ? monthInput.value : "MM";
    });

    // Update card expiration year
    yearInput.addEventListener("change", () => {
        cardYear.textContent = yearInput.value !== "YY" ? yearInput.value : "YY";
    });

    document.querySelector(".card-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        
        if (numberInput.value === "" || nameInput.value === "" || monthInput.value === "MM" || yearInput.value === "YY" || cvvPass.value === "") {

            alert("Please fill the required fields.");
            return;

        }

        const promise = new Promise((resolve, reject) => {

            let payNow = true;

            if (payNow) {
                resolve();

            } else {
                reject();
            }

        });

        promise.then(paided).catch(notpaided);

    });



    function paided() {
        setTimeout(() => {
            alert("Ticket is Booked Successfully.");
            card.classList.remove("moved");
            form.classList.remove("show");
            window.location.href = "success.html";

        }, 1500);
    };

    function notpaided() {
        setTimeout(() => {
            alert("Ticket Failed to Book.")
        }, 1500);
    };



});