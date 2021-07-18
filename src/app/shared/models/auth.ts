export interface Auth {
  username: string,
  password: string,
  access_token?: string,
  refresh_token?: string,
  grant_type?: string,
  client_id?: string,
  client_secret?: string
}
