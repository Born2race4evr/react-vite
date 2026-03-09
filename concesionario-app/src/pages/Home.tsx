import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../api/carsApi';
import './Home.css';

export const Home = () => {
    const { data: cars, isLoading, error } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    });

    if (isLoading) return <h2 className="home-status">Calentando motores...</h2>;
    if (error) return <h2 className="home-error">Avería en el motor de base de datos.</h2>;

    return (
        <div>
            <h1 className="home-title">
                Catálogo de <span>Vehículos</span>
            </h1>

            <div className="car-grid">
                {cars?.map((car) => (
                    <div key={car.id} className="car-card">
                        <div className="car-image-container">
                            <img src={car.image} alt={`${car.brand} ${car.model}`} className="car-image" />
                        </div>
                        <div className="car-info">
                            <h3 className="car-brand">{car.brand}</h3>
                            <h2 className="car-model">{car.model}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};