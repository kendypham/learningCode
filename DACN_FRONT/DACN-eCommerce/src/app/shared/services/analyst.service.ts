import { Injectable } from '@angular/core';
import { AnalystCommand } from './command/analyst-command';


@Injectable()
export class AnalystService {


	constructor(
		private analystCommand: AnalystCommand
	) {

	}

	get() {
		return this.analystCommand.get();
	}
}
