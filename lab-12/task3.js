const car1 = {
    brand: "Audi",
    model: "A4",
    year: 2021
};

const car2 = {
    brand: "Mazda",
    model: "6",
    owner: "Анастасія"
};

const car3 = {
    ...car1,
    ...car2
};

console.log(car3);
