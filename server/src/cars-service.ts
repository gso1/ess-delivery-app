import { Car } from "./car";
import EmailService from "./email-service"

export class CarService {
  cars: Car[] = [];
  idCount: number = 0;
  emailService: EmailService = new EmailService();

  add(car: Car): Car {
    if (this.cars.length >= 10) return null;
    const newCar = new Car(<Car> { id: this.idCount, ...car });
    if (newCar.price <= 0) {
      throw Error("Price can't equal or less than zero")
    }
    this.cars.push(newCar);
    this.idCount++;
    
    this.emailService.sendMail(
      {name: `${newCar.name}`, email: `car@${newCar.brand}.com`},
      {subject: `You created a car`, body: `Hello world, ${car.name}!`}
    );

    return newCar;
  }

  update(car: Car) : Car {
    console.log(this.cars)
    var result : Car = this.cars.find(c => c.id == c.id);
    if (result) result.update(car);
    return result;
  }

  get() : Car[] {
    return this.cars;
  }
  
  getById(carId: number) : Car {
    return this.cars.find(({ id }) => id == carId);
  }
}
