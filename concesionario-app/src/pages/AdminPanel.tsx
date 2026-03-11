import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchCars, deleteCar} from '../api/carsApi';
import './AdminPanel.css';

export const AdminPanel = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: cars, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    });

    const [deletingId, setDeletingId] = useState<number | null>(null);

    const deleteCarMutation = useMutation<number, Error, number>({
        mutationFn: deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            setDeletingId(null);
        },
    });

    const handleDelete = (carId: number) => {
        setDeletingId(carId);
        setTimeout(() => {
            deleteCarMutation.mutate(carId);
        }, 600);
    };

    if (isLoading) return <div className="loader-text">CARGANDO GARAJE...</div>;

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2 className="section-title">CONTROL DE <span>FLOTA</span></h2>
                <p className="admin-subtitle">GARAJE VIRTUAL Y GESTIÓN DE UNIDADES</p>
            </div>

            <div className="fleet-controls">
                <button
                    onClick={() => navigate('/admin/create')}
                    className="btn-deploy-car"
                >
                    + DESPLEGAR NUEVO CHASIS
                </button>
            </div>

            <div className="garage-grid">
                {cars?.map((car) => (
                    <div className="car-card" key={car.id}>
                        <div className="car-image-container">
                            {car.image ? (
                                <img src={car.image} alt={car.model} className="car-card-img" />
                            ) : (
                                <div className="car-card-no-img">SIN IMAGEN</div>
                            )}
                            <div className="car-id-badge">#{car.id}</div>
                        </div>

                        <div className="car-card-content">
                            <span className="car-brand-text">{car.brand.toUpperCase()}</span>
                            <h3 className="car-model-text">{car.model.toUpperCase()}</h3>

                            {/* NUEVO: ETIQUETA DE AUTOR DE LA PUBLICACIÓN */}
                            <div className="car-author-tag">
                                <span className="author-label">SUBIDO POR:</span>
                                <span className="author-name">{car.createdBy || 'OFICIAL'}</span>
                            </div>

                            <div className="car-card-actions">
                                <button
                                    onClick={() => navigate(`/admin/edit/${car.id}`)}
                                    className="btn-card-edit"
                                    disabled={deletingId === car.id}
                                >
                                    MODIFICAR
                                </button>
                                <button
                                    onClick={() => handleDelete(car.id)}
                                    className="btn-card-delete"
                                    disabled={deletingId === car.id}
                                >
                                    {deletingId === car.id ? 'DESMANTELANDO...' : 'DESMANTELAR'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {cars?.length === 0 && (
                    <div className="empty-garage-message">
                        EL GARAJE ESTÁ VACÍO. DESPLIEGA UN NUEVO CHASIS PARA EMPEZAR.
                    </div>
                )}
            </div>
        </div>
    );
};