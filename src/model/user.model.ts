export class Cbuser {

  private _id: number;
  private _cloud_id: string;
  private _email: string;
  private _token: string;
  private _fb_id: number;
  private _fb_full_name: string
  private _fb_profile_picture: string;


  constructor(id, email, token, cloud_id?, fb_id?, fb_full_name?, fb_profile_picture?){
    this._id = id;
    this._email = email;
    this._token = token;
    if (cloud_id) { this._cloud_id = cloud_id; }
    if (fb_id) { this._fb_id = fb_id };
    if (fb_full_name) { this._fb_full_name = fb_full_name; }
    if (fb_profile_picture) { this._fb_profile_picture = fb_profile_picture; }
  }

  getId() : number{
    return this._id;
  }

  setId(id) : void{
    this._id = id;
  }

  getCloudId() : string {
    return this._cloud_id;
  }

  setCloudId(cloud_id) : void {
    this._cloud_id = cloud_id;
  }

  getEmail() : string{
    return this._email;
  }

  setEmail(email) : void{
    this._email = email;
  }

  getToken() : string {
    return this._token;
  }

  setToken(token) : void {
    this._token = token;
  }

  getFbId() : number {
    return this._fb_id;
  }

  setFbId(fb_id) : void {
    this._fb_id = fb_id;
  }

  getFbFullName(): string {
    return this._fb_full_name;
  }

  setFbFullName(fb_full_name): void {
    this._fb_full_name = fb_full_name;
  }

  getFbProfilePicture(): string {
    return this._fb_profile_picture;
  }

  setFbProfilePicture(fb_profile_picture): void {
    this._fb_profile_picture = fb_profile_picture;
  }

}
