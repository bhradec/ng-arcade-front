import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMismatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get("password");
    const repeatedPassword = control.get("repeatedPassword");
    
    return password && repeatedPassword && password.value !== repeatedPassword.value ? { passwordMismatch: true } : null;
};
