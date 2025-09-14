export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function toCreateUserDTO(body: any): CreateUserDTO {
  return {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  };
}