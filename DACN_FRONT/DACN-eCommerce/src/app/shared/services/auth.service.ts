import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { isNullOrUndefined } from "util";
import { User } from "../models/user";
import { UserCommand } from "./command/user-command";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

  location = {
    lat: null,
    lon: null
  };

  tokenUser: any = null;
  user: User = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private storageService: StorageService,
    private userCommand: UserCommand,
  ) {
    this.tokenUser = this.storageService.getAccessToken();
    this.user = JSON.parse(this.storageService.getUser());
  }

  isLoggedIn(): boolean {
    return !isNullOrUndefined(this.user) && !isNullOrUndefined(this.tokenUser);
  }

  getToken(): boolean {
    this.tokenUser = this.storageService.getAccessToken();
    return this.tokenUser;
  }

  logout() {
    this.tokenUser = null;
    this.user = null;
    this.storageService.deleteLoggedInUser();
  }

  createUserWithEmailAndPassword(emailID: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailID,
      password
    );
  }

  getLoggedInUser(): any {
    this.user = JSON.parse(this.storageService.getUser());
    return this.user;
  }

  getProfile(): any {
    return this.userCommand.getProfile();
  }

  getAllUser(): any {
    return this.userCommand.getUser();
  }

  isAdmin(): boolean {
    this.user = this.getLoggedInUser();
    if (this.user != null) {
      if (this.user.permission === "ADMIN") {
        return true;
      }
      return false;
    }
  }

  signInRegular(email, password) {
    // return userCommand.signIn(email, password);
  }

  signInWithGoogleType1() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  createUser(data: any) {
    data.location = this.location;
    data.isAdmin = false;
    return this.userCommand.createUser(data);
  }

  updateUserDetail(data: any) {
    return this.userCommand.updateUser(data);
  }

  signInWithGoogleType2(data: any) {
    return this.userCommand.loginWithGoogle(data);
  }

  setLocation(latitude: any, longitude: any): any {
    this.location.lat = latitude;
    this.location.lon = longitude;
  }

  signInWithGmail(data: any) {
    return this.userCommand.loginWithGmail(data);
  }

  deleteUser(id: any) {
    return this.userCommand.deleteUserId(id);
  }

  uploadUserAvatar(data : any){
    return this.userCommand.uploadAvatar(data);
  }

  forgotPassword(emailAddress: any){
    return this.userCommand.forgotPassword(emailAddress);
  }

  resetPassword(data: any){
    return this.userCommand.resetPassword(data);
  }

  changePassword(data: any){
    return this.userCommand.changPassword(data);
  }

  requestConfirmEmail(token){
    return this.userCommand.requestConfirmEmail(token);
  }

  confirmEmail(token){
    return this.userCommand.confirmEmail(token);
  }
}
