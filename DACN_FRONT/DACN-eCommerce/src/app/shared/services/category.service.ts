import { Injectable } from "@angular/core";
import { CategoryCommand } from "./command/category-command";


@Injectable()
export class CategoryService {


	constructor(
		private categoryCommand: CategoryCommand
	) {

	}

	getAllCategorys() {
		return this.categoryCommand.getAll();
	}

	getCategoryById(id: any) {
		return this.categoryCommand.getDetail(id);
	}

	createCategory(data: any) {
		return this.categoryCommand.createCategory(data);
	}

	updateCategory(data: any) {
		return this.categoryCommand.updateCategory(data);
	}

	deleteCategory(id: any) {
		return this.categoryCommand.deleteCategoryId(id);
	}

}
