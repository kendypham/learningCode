import { Injectable } from '@angular/core';
import { Category } from '../models/Category';


@Injectable()
export class CommonUtilsService {

    private _categorys: Category[] = null;
    get categorys() {
        return this._categorys;
    }
    set categorys(val: any) {
        this._categorys = val;
    }
    constructor(
    ) {

    }

    parsePlainTextFromHTML(str: any): String {
        let tmp = ''
        if (!str) return tmp
        tmp = String(str).replace(/(&nbsp;|<([^>])+>)/ig, " ");
        return tmp
    }
}
