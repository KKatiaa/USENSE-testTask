import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnInit {
  password: string;
  isFirstCircle = 'grey';
  isSecondCircle = 'grey';
  isThirdCircle = 'grey';
  passwordForm: FormGroup;


  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required]
    });
    this.passwordForm.get('password').valueChanges.subscribe(
      value => {
        this.isOnlyLettersOrNumbersOrSymbols(value);
        this.hasCombinationOfLettersAndSymbols(value);
      }
    );
  }

  constructor(private fb: FormBuilder) {}

  isOnlyLettersOrNumbersOrSymbols(password) {
    const onlyLettersRegExp = /^[a-zA-Z]+$/;
    const onlyNumbersRegExp = /^[0-9]+$/;
    const onlySymbolsRegExp = /^[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]+$/;

    const containsLetters = onlyLettersRegExp.test(password);
    const containsDigits = onlyNumbersRegExp.test(password);
    const containsSymbols = onlySymbolsRegExp.test(password);

    const isStrOnlyLetDigSym = (containsLetters || containsDigits || containsSymbols) && password.length >= 8;

    if (password.length < 8) {
      this.isFirstCircle = 'red';
      this.isSecondCircle = 'red';
      this.isThirdCircle = 'red';
    }
    if (!password) {
      this.isFirstCircle = 'grey';
      this.isSecondCircle = 'grey';
      this.isThirdCircle = 'grey';
    }
    if (isStrOnlyLetDigSym) {
      this.isFirstCircle = 'red';
      this.isSecondCircle = 'grey';
      this.isThirdCircle = 'grey';
    }
  }

  hasCombinationOfLettersAndSymbols(password) {
    const lettersRegExp = /[a-zA-Z]/;
    const digitsRegExp = /[0-9]/;
    const symbolsRegExp = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;

    const containsLetters = lettersRegExp.test(password);
    const containsDigits = digitsRegExp.test(password);
    const containsSymbols = symbolsRegExp.test(password);

    const isOnlyCombinationOf2 = ((containsLetters && containsSymbols) ||
      (containsLetters && containsDigits) ||
      (containsDigits && containsSymbols)) && password.length >= 8;
    const isLetDigSym = containsLetters && containsSymbols && containsDigits && password.length >= 8;

    if (isLetDigSym) {
      this.isFirstCircle = 'green';
      this.isSecondCircle = 'green';
      this.isThirdCircle = 'green';

    } else if (isOnlyCombinationOf2) {
      this.isFirstCircle = 'yellow';
      this.isSecondCircle = 'yellow';
      this.isThirdCircle = 'grey';
    }
  }
}
