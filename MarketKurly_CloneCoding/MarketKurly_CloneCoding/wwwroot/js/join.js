let agreeParentDiv = document.querySelector(".reg_agree");

let agreeChildDivs = agreeParentDiv.getElementsByTagName("div");
let agreeChildImages = agreeParentDiv.getElementsByTagName("img");
let agreeChildCheckbox = agreeParentDiv.getElementsByTagName("input");

for (let i = 0; i < agreeChildDivs.length; i++) {
    let agreeChildDiv = agreeChildDivs[i];

    switch (agreeChildDiv.id) {
        case "allCheckDiv":
            agreeChildDiv.addEventListener("click", function() {
                let allCheckbox = agreeChildCheckbox.namedItem("allCheck");
                let allCheckImage = agreeChildImages.namedItem("allCheckImage");
                
                setImageAndCheckbox(allCheckImage, allCheckbox);

                for (let divIndex = 1; divIndex < agreeChildCheckbox.length; divIndex++) { 
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
            if(agreeChildDiv.id === "")
            {
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

    for (let i = 1; i < checkboxs.length; i++) {
        const checkbox = checkboxs[i];
        
        if(!checkbox.checked)
        {
            isAllCheck = false;

            break;
        }
    }

    return isAllCheck;
}

function setImageAndCheckbox(image, checkbox, isCheck) {
    switch (arguments.length) {
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