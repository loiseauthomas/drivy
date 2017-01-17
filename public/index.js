'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//console.log(cars);
//console.log(rentals);
//console.log(actors);
//console.log(rentalModifications);



////////////////////////////////////////EXERCISES////////////////////////////////////////////


//Exercise 1 - Euro-Kilometers
function getRental(cars, rentals){
  var i=0;
  var j=0;
  for(i=0; i<rentals.length; i++){
    for(j=0; j<cars.length; j++){
      if(rentals[i].carId==cars[j].id){
        rentals[i]=getRentalPrice(cars[j], rentals[i]);
        rentals[i]=getRentalCommition(rentals[i]);
        rentals[i]=getRentalDeductible(rentals[i]);
      }
    }
  }
  return rentals;
}

function timeOfrentalCalculation(rental){
  var timeOfrental=Date.parse(rental.returnDate)-Date.parse(rental.pickupDate);// Calculate the difference in milliseconds
  timeOfrental=Math.round(timeOfrental/(1000 * 60 * 60 * 24));//comvert the diference of time in nombre of days
  timeOfrental+=1;//add 1 days -> evry day is due
  return timeOfrental
}

function getRentalPrice(car, rental){
  var rentalPrice = 0;
  //claculate te time of rental
  var timeOfrental=timeOfrentalCalculation(rental);

  //calculate the price for the time and price for the distance
  var priceTime = car.pricePerDay * timeOfrental;

  //Exercise 2 - Drive more, pay less
  if(1<timeOfrental && timeOfrental<=4){
    priceTime*=0.90;//reductuion of 10% on the time rental price
  }
  if(4<timeOfrental && timeOfrental<=10){
    priceTime*=0.70;//reductuion of 30% on the time rental price
  }
  if(10<timeOfrental){
    priceTime*=0.50;//reductuion of 50% on the time rental price
  }

  var priceDistance = car.pricePerKm * rental.distance;

  //calculate rental price
  rentalPrice=priceTime+priceDistance;
  rental.price=rentalPrice
  return rental;
}

//Exercise 3 - Give me all your money
function getRentalCommition(rental){
  var price=rental.price;
  var commission=Math.round(price*0.3);//Drivy take a 30% commission on the rental price to cover their costs.
  var insurance=commission*0.5;//insurance: half of commission
  var assistance=1*timeOfrentalCalculation(rental);//roadside assistance 1€ per day
  var drivy=commission-insurance-assistance;//drivy: the rest
  rental.commission.insurance=insurance;
  rental.commission.assistance=assistance;
  rental.commission.drivy=drivy;
  return rental;
}

//Exercice 4 - The famous deductible
function getRentalDeductible(rental){
  if(rental.options.deductibleReduction==true){
    var timeOfRental=timeOfrentalCalculation(rental);
    rental.price+=4*timeOfRental;
    rental.commission.drivy+=4*timeOfRental;
  }
  return rental;
}

//Exercise 5 - Pay the actors
function payActors(actors, rentals){
  var i=0;
  var j=0;
  for(i=0; i<rentals.length; i++){
    for(j=0; j<actors.length; j++){
      if(rentals[i].id==actors[j].rentalId){
        actors[j].payment[0].amount=rentals[i].price;//payment[0].who=="driver"  the driver must pay the rental price and the (optional) deductible reduction
        actors[j].payment[1].amount=rentals[i].price-rentals[i].commission.insurance-rentals[i].commission.assistance-rentals[i].commission.drivy;//payment[1].who=="owner"  the owner receives the rental price minus the commission
        actors[j].payment[2].amount=rentals[i].commission.insurance;//payment[2].who=="insurance"   the insurance receives its part of the commission
        actors[j].payment[3].amount=rentals[i].commission.assistance;//payment[3].who=="assistance"   the assistance receives its part of the commission
        actors[j].payment[4].amount=rentals[i].commission.drivy;//payment[4].who=="drivy"   drivy receives its part of the commission, plus the deductible reduction
      }
    }
  }
  return actors;
}



//////////////////////////////////////////ECRITURE CONSOLE////////////////////////////////////////////////////////////
console.log("//Exercise 5 - Pay the actors");
rentals=getRental(cars, rentals);
console.log(rentals);
actors=payActors(actors,rentals);
console.log(actors);