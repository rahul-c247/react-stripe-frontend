const Validators={
    capitalLetter : /^(?=.*[a-z])(?=.*[A-Z])/,
    oneNumber : /^(?=.*[0-9])/,
    oneSpecialChar : /^(?=.*[!@#\$%\^&\*])/,
    passLength : /^(?=.{8,})/,
}

export default Validators