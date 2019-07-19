import { Component, OnInit } from "@angular/core";
import { NavbarFooterService } from "src/app/shared/services/nav-bar-footer.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor(public navbarFooterService: NavbarFooterService, ) { }

  ngOnInit() { }
}
