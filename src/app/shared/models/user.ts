import { EmailValidator } from "@angular/forms";

export interface User {
  id?: string,
  name?: string,
  email: EmailValidator,
  password?: string,
  password_confirmation?: string,
  created_at?: Date,
  updated_at?: Date
}
