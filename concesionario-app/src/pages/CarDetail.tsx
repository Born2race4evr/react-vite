import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../api/carsApi';
import './CarDetail.css';

export const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: cars, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    });

    const car = cars?.find((c) => Number(c.id) === Number(id));

    if (isLoading) return <div className="loader-text">CARGANDO TELEMETRÍA...</div>;

    if (!car) return (
        <div className="loader-text">
            VEHÍCULO NO ENCONTRADO
            <button onClick={() => navigate('/')}>VOLVER</button>
        </div>
    );

    return (
        <div className="detail-container">
            <button onClick={() => navigate(-1)} className="btn-back">
                ← VOLVER AL INVENTARIO
            </button>

            <div className="detail-grid">
                <div className="detail-image-box">
                    <img
                        src={car.image}
                        alt={car.model}
                        className="detail-image"
                    />
                </div>

                <div className="detail-info-glass">
                    <div className="info-header">
                        <span className="info-brand">{car.brand.toUpperCase()}</span>
                        <h1 className="info-model">{car.model.toUpperCase()}</h1>
                    </div>

                    <div className="specs-grid">
                        <div className="spec-item">
                            <span className="spec-label">POTENCIA</span>
                            <span className="spec-value">{car.hp || '---'}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">0-100 KM/H</span>
                            <span className="spec-value">{car.acceleration || '---'}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">VEL. MÁXIMA</span>
                            <span className="spec-value">{car.topSpeed || '---'}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">TRACCIÓN</span>
                            <span className="spec-value">{car.drive || '---'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};