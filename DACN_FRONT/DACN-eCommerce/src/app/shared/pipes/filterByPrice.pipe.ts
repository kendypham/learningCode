import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterByPrice"
})
export class FilterByPricePipe implements PipeTransform {
  transform(items: any, select?: any): any {
    if (select === "All") {
      return items;
    }
    else if(select === "Under 1m"){
      return select
        ? items.filter(item => item["price"] >= 0 && item["price"] < 1000000)
        : items;
    }
    else if(select === "1m - 3m"){
      return select
        ? items.filter(item => item["price"] >= 1000000 && item["price"] < 3000000)
        : items;
    }
    else if(select === "3m - 6m"){
      return select
        ? items.filter(item => item["price"] >= 3000000 && item["price"] < 6000000)
        : items;
    }
    else if(select === "6m - 10m"){
      return select
        ? items.filter(item => item["price"] >= 6000000 && item["price"] < 10000000)
        : items;
    }
    else if(select === "10m - 15m"){
      return select
        ? items.filter(item => item["price"] >= 10000000 && item["price"] < 15000000)
        : items;
    }
    else if(select === "Over 15m"){
      return select
        ? items.filter(item => item["price"] >= 15000000)
        : items;
    }
  }
}
