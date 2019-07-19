import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavbarFooterService } from 'src/app/shared/services/nav-bar-footer.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	constructor(public navbarFooterService: NavbarFooterService, public authService: AuthService) {
		navbarFooterService.show();
	}
	ngOnInit() { }
}
