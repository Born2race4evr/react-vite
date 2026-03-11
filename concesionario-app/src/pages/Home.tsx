import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../api/carsApi';
import { Link } from 'react-router-dom';
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
                    <Link to={`/car/${car.id}`} key={car.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="car-card">
                            <div className="car-image-container">
                                <img src={car.image} className="car-image" alt={car.model} />
                            </div>
                            <div className="car-info">
                                <span className="car-brand">{car.brand}</span>
                                <h3 className="car-model">{car.model}</h3>

                                {/* NUEVO: ETIQUETA DE AUTOR DE LA PUBLICACIÓN */}
                                <div className="home-car-author">
                                    <span className="home-author-label">SUBIDO POR:</span>
                                    <span className="home-author-name">{car.createdBy || 'OFICIAL'}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};