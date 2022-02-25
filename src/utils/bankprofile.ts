export async function foodbankUpdate(name: string, address: string, postcode: string) {
    
    let errors = validateBankDetails(name, address, postcode);
    
    return errors;
}

function validateBankDetails(name: string, address: string, postcode: string) {
    let errors: BankErrors = {name: "", address: "", postcode: ""};

    errors = validateName(name, errors);
    errors = validateAddress(address, errors);
    errors = validatePostcode(postcode, errors);

    console.log(errors);
    console.log(checkErrors(errors));

    return errors;
}

function validateName(name: string, errors: BankErrors) {
    if (name === "") {
        errors.name = "Name cannot be empty";
    }
    // Add in length limit
    return errors
}

function validateAddress(address: string, errors: BankErrors) {
    if (address === "") {
        errors.address = "Address cannot be empty";
    }
    // Add in better validation here
    // Add in length limit
    return errors;
}

function validatePostcode(postcode: string, errors: BankErrors) {
    if (postcode === "") {
        errors.postcode = "Postcode cannot be empty";
    }
    // Add in specific postcode checking (regex?)
    // Add in length limit
    return errors;
}

function checkErrors(errors: BankErrors) {
    return Object.values(errors).every((v) => v === "");
}

export type BankErrors = {
    name: string,
    address: string,
    postcode: string
}
