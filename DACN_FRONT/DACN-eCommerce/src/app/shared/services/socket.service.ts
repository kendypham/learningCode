import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { ToastrService } from './toastr.service';
@Injectable({
	providedIn: 'root'
})
export class SocketService {

	private socket;

	constructor(
		private toastrService: ToastrService,
	) {
		this.socket = io('http://localhost:1340');

		this.socket.on('newOrder', (data) => {
            this.toastrService.info('New Order', `Order ID: ${data}`);
		});
	}

	notifyUserOnline() {
		this.socket.emit('userOnline');
	}

	getUserCount(): Observable<number> {
		this.socket.emit('userCountRequest');
		return Observable.create((observer) => {
			this.socket.on('userCountUpdate', (data) => {
				observer.next(data);
			});
		});
	}
}
