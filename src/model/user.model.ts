export class Cbuser {

  id: number;
  cloud_id: string;
  email: string;
  token: string;
  fb_id: number;
  fb_full_name: string
  fb_profile_picture: string;


  constructor(id, email, token, cloud_id?, fb_id?, fb_full_name?, fb_profile_picture?){
    this.id = id;
    this.email = email;
    this.token = token;
    if (cloud_id) { this.cloud_id = cloud_id; }
    if (fb_id) { this.fb_id = fb_id };
    if (fb_full_name) { this.fb_full_name = fb_full_name; }
    if (fb_profile_picture) { this.fb_profile_picture = fb_profile_picture; }
  }

}
