export interface Car {
    id: number;
    brand: string;
    model: string;
    image: string;
}

// Simulamos una base de datos en memoria
let mockCars: Car[] = [
    { id: 1, brand: 'Toyota', model: 'Supra', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop' },
    { id: 2, brand: 'Nissan', model: 'GT-R', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop' }
];

export const fetchCars = async (): Promise<Car[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockCars]), 500));
};

export const createCar = async (newCar: Omit<Car, 'id'>): Promise<Car> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const car = { ...newCar, id: Date.now() };
            mockCars.push(car);
            resolve(car);
        }, 500);
    });
};

export const updateCar = async (updatedCar: Car): Promise<Car> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockCars = mockCars.map((car) => (car.id === updatedCar.id ? updatedCar : car));
            resolve(updatedCar);
        }, 500);
    });
};

export const deleteCar = async (id: number): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockCars = mockCars.filter((car) => car.id !== id);
            resolve(id);
        }, 500);
    });
};