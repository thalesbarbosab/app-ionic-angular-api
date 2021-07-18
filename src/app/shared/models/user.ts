import { EmailValidator } from "@angular/forms";

export interface User {
  id?: string,
  name?: string,
  email: EmailValidator,
  password?: string,
  password_confirmation?: string
}
