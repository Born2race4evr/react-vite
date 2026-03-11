export interface Car {
    id: number;
    brand: string;
    model: string;
    image: string;
    hp?: string;
    acceleration?: string;
    topSpeed?: string;
    drive?: string;
    createdBy?: string;
}

const STORAGE_KEY = 'motorsport-flota';

const getCarsFromStorage = (): Car[] => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
        return JSON.parse(storedData);
    }

    const defaultCars: Car[] = [
        {
            id: 1,
            brand: "Toyota",
            model: "Supra",
            image: "/supra.jpg",
            hp: "340 CV",
            acceleration: "4.3s",
            topSpeed: "250 KM/H",
            drive: "RWD",
            createdBy: "OFICIAL"
        }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCars));
    return defaultCars;
};

const saveCarsToStorage = (cars: Car[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch (error) {
        // Fallo silencioso de guardado
    }
};

export const fetchCars = async (): Promise<Car[]> => {
    return getCarsFromStorage();
};

export const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
    const cars = getCarsFromStorage();

    const nextId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    const newCar = { ...car, id: nextId };

    cars.push(newCar);
    saveCarsToStorage(cars);

    return newCar;
};

export const updateCar = async (updatedCar: Car): Promise<Car> => {
    let cars = getCarsFromStorage();

    const index = cars.findIndex(c => c.id === updatedCar.id);
    if (index === -1) {
        throw new Error("Car not found");
    }

    // BLINDAJE DE DATOS: Recuperamos el coche original antes de sobreescribirlo
    const originalCar = cars[index];

    // Fusionamos los datos. Si updatedCar no trae autor, mantenemos el que ya tenía.
    cars[index] = {
        ...updatedCar,
        createdBy: updatedCar.createdBy || originalCar.createdBy
    };

    saveCarsToStorage(cars);

    return cars[index];
};

export const deleteCar = async (id: number): Promise<number> => {
    let cars = getCarsFromStorage();
    cars = cars.filter((c) => c.id !== id);
    saveCarsToStorage(cars);
    return id;
};