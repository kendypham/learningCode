import { Component, OnInit } from "@angular/core";
import * as Moment from "moment";
import { filter, find } from "node_modules/lodash";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth.service";
import { ProductService } from "../../../shared/services/product.service";

@Component({
  selector: "app-product-comment",
  templateUrl: "./product-comment.component.html",
  styleUrls: ["./product-comment.component.scss"]
})
export class ProductCommentComponent implements OnInit {
  productId: any;
  listComment = [];
  listUser = [];
  addComment = false;
  isCommented = false;
  userDetail: User;
  productComment: any;
  rating = 0;
  set setProductId(val) {
    this.productId = val;
  }
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getUserDetail();
    this.getAllComments();
  }

  getUserDetail() {
    this.authService.getProfile()
      .subscribe(data => {
        this.userDetail = data.data.user;
        console.log(this.userDetail);
      }, (err) => {
        console.log("error", err);
      });
  }

  getAllComments() {
    this.productService.getAllComments()
      .subscribe(data => {
        const tempList = filter(data, val => val.productId === this.productId);
        this.getUserComment(tempList);
      }, (err) => {
        console.log("error", err);
      });
  }


  getUserComment(listComment) {
    this.authService.getAllUser()
      .subscribe(data => {
        this.listUser = data;
        for (const comment of listComment) {
          if (find(data, val => val.id === comment.userId) !== undefined) {
            comment.userDetail = find(data, val => val.id === comment.userId);
          }
          if (comment.userId === this.userDetail.id) {
            this.isCommented = true;
          }
        }
      });
    console.log(listComment);
    this.listComment = listComment;
  }

  openCommentClick() {
    this.addComment = !this.addComment;
  }

  addCommentClick() {
    const data = {
      userId: this.userDetail.id,
      productId: this.productId,
      rating: this.rating,
      content: this.productComment
    };
    this.productService.createComment(data)
      .subscribe(res => {
        this.toastrService.success("Comment successful", "");
        location.reload();
      }, err => {
        console.log(err);
      });
  }

  onStarClick(event) {
    this.rating = event.rating;
  }

  disableBtn() {
    return !(this.rating !== 0 && this.productComment !== undefined);
  }

  distanceDate(date: any) {
    console.log(date);
    return Moment(date).fromNow();
  }

}
