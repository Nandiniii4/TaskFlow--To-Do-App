const nameInput = document.getElementById("full-name");
const dobInput = document.getElementById("dob");
const form = document.getElementById("input-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = nameInput.value.trim();
    let dob = dobInput.value.trim();
    let age;
    let isValidLogin = true;
    
    if(name != "" && dob != ""){
        age = calculateAge(dob);
        if(age <= 10){
            showError(dobInput,`Age must be greater than 10 years old`);
            isValidLogin = false;
            return;
        }
    }else{
        if(name == ""){
            showError(nameInput, `Please enter your name`);
            isValidLogin = false;
            return;
        }else if(dob == ""){
            showError(dobInput, `Please enter your age`);
            isValidLogin = false;
            return;
        }
        
    }
    if(isValidLogin){
        window.location.replace("app.html");
    }
    nameInput.value="";
    dobInput.value = "";
});

function calculateAge(DOB){
    const dob = new Date(DOB); 
    const currentDate = new Date();
    let yearDiff = currentDate.getFullYear() - dob.getFullYear();

    return yearDiff;
}

function showError(element, msg){
    const smallElement = element.nextElementSibling;;
    smallElement.textContent = msg;
}