const car = {
    model: 'Fiesta',
    manufacturer: 'Ford',
    fullName: () => {
    return `${this.manufacturer} ${this.model}`
    }
 }
 var test = car.fullName;

 console.log(test.bind(car));
 