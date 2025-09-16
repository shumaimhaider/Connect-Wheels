export interface LoginUserDTO {
    email: string;
    password: string;
}

export function toLoginUserDTO(body: any): LoginUserDTO {
    return {
        email: body.email,
        password: body.password,
    };
}