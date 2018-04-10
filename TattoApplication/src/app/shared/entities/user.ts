export class User {
    public Id: any;
    public userName: string;
    public password: string;
    public confirmpassword: string;
    public isAuthenticated: Boolean;

}
export class AddUserBinding {

    public email: string;
    public password: string;
    public confirmpassword: string;

};