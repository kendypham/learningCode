export class User {
  id: string;
  userId: string;
  emailAddress: string;
  password: string;
  location: {
    lat: number;
    lon: number;
  };
  phoneNumber: string;
  createdOn: string;
  permission: string;
  avatar: string;
  googleId: string;
  profile: UserDetail;
}

export class UserDetail {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  zip: number;
  gender: string;
}
