let agreeParentDiv = document.querySelector(".reg_agree");

let agreeChildDivs = agreeParentDiv.getElementsByTagName("div");
let agreeChildImages = agreeParentDiv.getElementsByTagName("img");
let agreeChildCheckbox = agreeParentDiv.getElementsByTagName("input");

for(let i = 0; i < agreeChildDivs.length; i++) {
    let agreeChildDiv = agreeChildDivs[i];

    switch(agreeChildDiv.id) {
        case "allCheckDiv":
            agreeChildDiv.addEventListener("click", function() {
                let allCheckbox = agreeChildCheckbox.namedItem("allCheck");
                let allCheckImage = agreeChildImages.namedItem("allCheckImage");

                setImageAndCheckbox(allCheckImage, allCheckbox);

                for(let divIndex = 1; divIndex < agreeChildCheckbox.length; divIndex++) {
                    setImageAndCheckbox(agreeChildImages[divIndex], agreeChildCheckbox[divIndex], allCheckbox.checked);
                }
            });

            break;
        case "infoRevAgreeDiv":
            agreeChildDiv.addEventListener("click", function() {
                let image = agreeChildImages.namedItem("infoRevAgreeImage");
                let checkbox = agreeChildCheckbox.namedItem("infoRevAgree");

                setImageAndCheckbox(image, checkbox);

                setImageAndCheckbox(agreeChildImages.namedItem("smsImage"), agreeChildCheckbox.namedItem("smsAgree"), checkbox.checked);
                setImageAndCheckbox(agreeChildImages.namedItem("emailImage"), agreeChildCheckbox.namedItem("emailAgree"), checkbox.checked);
            });

            break;
        case "smsDiv":
        case "emailDiv":
            agreeChildDiv.addEventListener("click", function() {
                let image = agreeChildDiv.querySelector("img");
                let checkbox = agreeChildDiv.querySelector("input");

                setImageAndCheckbox(image, checkbox);

                let parentImage = agreeChildImages.namedItem("infoRevAgreeImage");
                let parentCheckbox = agreeChildCheckbox.namedItem("infoRevAgree");

                setImageAndCheckbox(parentImage, parentCheckbox, isSmsAndEmailCheck());
            });
            break;
        default:
            if(agreeChildDiv.id === "") {
                break;
            }

            agreeChildDiv.addEventListener("click", function() {
                let image = agreeChildDiv.querySelector("img");
                let checkbox = agreeChildDiv.querySelector("input");

                setImageAndCheckbox(image, checkbox);

                let isAll = isAllCheck();
                let allCheckbox = agreeChildCheckbox.namedItem("allCheck");
                let allCheckImage = agreeChildImages.namedItem("allCheckImage");

                setImageAndCheckbox(allCheckImage, allCheckbox, isAll);
            });

            break;
    }
}

function isAllCheck() {
    let checkboxs = agreeChildCheckbox;
    let isAllCheck = true;

    for(let i = 1; i < checkboxs.length; i++) {
        const checkbox = checkboxs[i];

        if(!checkbox.checked) {
            isAllCheck = false;

            break;
        }
    }

    return isAllCheck;
}

function setImageAndCheckbox(image, checkbox, isCheck) {
    switch(arguments.length) {
        case 2:
            checkbox.checked = !checkbox.checked;
            image.src = checkbox.checked ? "/images/ico_checkbox_checked.svg" : "/images/ico_checkbox.svg";

            break;
        case 3:
            checkbox.checked = isCheck;
            image.src = isCheck ? "/images/ico_checkbox_checked.svg" : "/images/ico_checkbox.svg";

            break;
        default:
            break;
    }
}

function isSmsAndEmailCheck() {
    let smsCheckbox = agreeChildCheckbox.namedItem("smsAgree");
    let emailCheckbox = agreeChildCheckbox.namedItem("emailAgree");

    return smsCheckbox.checked && emailCheckbox.checked;
}

function removeBadAndAddGood(span) {
    if(span.classList.contains("bad")) {
        span.classList.remove("bad");
    }

    if(!span.classList.contains("good")) {
        span.classList.add("good");
    }
}

function removeGoodAndAddBad(span) {
    if(span.classList.contains("good")) {
        span.classList.remove("good");
    }

    if(!span.classList.contains("bad")) {
        span.classList.add("bad");
    }
}

function setBorderNoneToBlock(td) {
    let textGuide = td.querySelector("p");

    if(textGuide.style.display === "none") {
        textGuide.style.display = "block";
    }
}

let idBox = document.querySelector("#td_id");
let text_id = idBox.querySelector("input");

text_id.addEventListener("keyup", function() {
    let spans = idBox.querySelectorAll(".txt_guide span");
    const re = /^[a-zA-Z0-9]{6,}$/;
    let span = spans[0];

    if(re.test(text_id.value)) {

        removeBadAndAddGood(span);
        
    } else {
        removeGoodAndAddBad(span);
    }
});

text_id.addEventListener("focus", function() {
    setBorderNoneToBlock(idBox);
});

let passwordBox = document.querySelector("#td_password");
let text_password = passwordBox.querySelector("input");

text_password.addEventListener("keyup", function() {
    let spans = passwordBox.querySelectorAll(".txt_guide span");
    const re1 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])[\S]{10,}$/;
    const re2 = /^(?=.*[!@#$%^*+=-])(?=.*[0-9])[\S]{10,}$/;
    const re3 = /^(?=.*[0-9])(?=.*[a-zA-Z])[\S]{10,}$/;
    const re4 = /(\d)\1\1/;

    if(text_password.value.length >= 10) {
        removeBadAndAddGood(spans[0]);
    } else {
        removeGoodAndAddBad(spans[0]);
    }

    if(re1.test(text_password.value) || re2.test(text_password.value) || re3.test(text_password.value)) {
        removeBadAndAddGood(spans[1]);
    } else {
        removeGoodAndAddBad(spans[1]);
    }

    if(re4.test(text_password.value)) {
        removeGoodAndAddBad(spans[2]);
    } else {
        removeBadAndAddGood(spans[2]);
    }
});

text_password.addEventListener("focus", function() {
    setBorderNoneToBlock(passwordBox);
});

let passwordConfirmBox = document.querySelector("#td_passwordConfirm");
let text_passwordConfirm = passwordConfirmBox.querySelector("input");

text_passwordConfirm.addEventListener("keyup", function() {
    let span = passwordConfirmBox.querySelector(".txt_guide span");

    if(text_password.value === text_passwordConfirm.value) {
        removeBadAndAddGood(span);
    } else {
        removeGoodAndAddBad(span);
    }
});

text_passwordConfirm.addEventListener("focus", () => {
    setBorderNoneToBlock(passwordConfirmBox);
});

let btnIdConfirm = $("#btn_idConfirm");


btnIdConfirm.click(() => {
    axios.get("/Member/ConfirmId", {
        params: {
            id: text_id.value
        }
    }).then((response) => {
        let spans = idBox.querySelectorAll(".txt_guide span");

        if(response.data) {
            removeBadAndAddGood(spans[1]);
        } else {
            removeGoodAndAddBad(spans[1]);
        }
    }).catch((error) => {
        console.log(error);
    })
});

let emailBox = document.querySelector("#td_email");
let text_email = emailBox.querySelector("input");
let btnEmailConfirm = $("#btn_emailConfirm");

btnEmailConfirm.click(() => {
    let value = {
        email: text_email.value
    };

    $.ajax({
        url: "/Member/confirm-email",
        method: "GET",
        contentType: "application/json",
        data: value
    })
    .done(response => {
        if(!response.data) {
            alert("사용 가능한 이메일입니다.");
        }
    })
    .fail(error => {
        console.log(error);
    });

    //axios.get("/Member/ConfirmEmail", {
    //    params: {
    //        id: text_email.value
    //    }
    //}).then((response) => {
    //    console.log(response);

    //    if(response.data) {

    //    } else {

    //    }
    //}).catch((error) => {
    //    console.log(error);
    //})
});