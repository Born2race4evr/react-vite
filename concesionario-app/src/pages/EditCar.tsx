import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCars, updateCar, type Car } from '../api/carsApi';
import './EditCar.css'; // <-- Cambiado para usar los estilos del cristal translúcido

export const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: cars, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    });

    const carToEdit = cars?.find(c => Number(c.id) === Number(id));

    const [formData, setFormData] = useState<Car>({
        id: Number(id),
        brand: '',
        model: '',
        image: '',
        hp: '',
        acceleration: '',
        topSpeed: '',
        drive: ''
    });

    // Estado para dar feedback visual al guardar
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (carToEdit) {
            setFormData({
                id: carToEdit.id,
                brand: carToEdit.brand || '',
                model: carToEdit.model || '',
                image: carToEdit.image || '',
                hp: carToEdit.hp || '',
                acceleration: carToEdit.acceleration || '',
                topSpeed: carToEdit.topSpeed || '',
                drive: carToEdit.drive || ''
            });
        }
    }, [carToEdit]);

    const updateCarMutation = useMutation<Car, Error, Car>({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            navigate('/admin');
        }
    });

    // Procesador de Imágenes a Base64
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Pequeño retraso simulado para el feedback visual
        setTimeout(() => {
            updateCarMutation.mutate(formData);
        }, 800);
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    if (isLoading) return <div className="loader-text">CARGANDO TALLER...</div>;
    if (!carToEdit) return <div className="loader-text">ERROR: VEHÍCULO NO IDENTIFICADO</div>;

    return (
        <div className="edit-overlay">
            <div className="edit-container">
                <header className="edit-header">
                    <h2 className="edit-title">TALLER DE <span>MODIFICACIONES</span></h2>
                    <p className="edit-subtitle">Editando telemetría de: {formData.brand} {formData.model}</p>
                </header>

                <form onSubmit={handleSubmit} className="edit-form">

                    <div className="form-row">
                        <div className="form-group">
                            <label>MARCA</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>MODELO</label>
                            <input
                                type="text"
                                value={formData.model}
                                onChange={e => setFormData({ ...formData, model: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* ZONA DE SUBIDA DE IMAGEN LIMPIA */}
                    <div className="image-upload-section">
                        <label>FOTOGRAFÍA DEL VEHÍCULO (Arrastra o haz clic)</label>
                        <div className="image-preview-box" style={{ position: 'relative' }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, width: '100%', height: '100%',
                                    opacity: 0, cursor: 'pointer', zIndex: 10
                                }}
                            />
                            {formData.image ? (
                                <img
                                    src={formData.image}
                                    alt="Vista previa"
                                    style={{ zIndex: 1 }}
                                />
                            ) : (
                                <span className="img-placeholder">+</span>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>POTENCIA</label>
                            <input
                                type="text"
                                value={formData.hp}
                                onChange={e => setFormData({ ...formData, hp: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>0-100 KM/H</label>
                            <input
                                type="text"
                                value={formData.acceleration}
                                onChange={e => setFormData({ ...formData, acceleration: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>VELOCIDAD MÁXIMA</label>
                            <input
                                type="text"
                                value={formData.topSpeed}
                                onChange={e => setFormData({ ...formData, topSpeed: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>TRACCIÓN</label>
                            <input
                                type="text"
                                value={formData.drive}
                                onChange={e => setFormData({ ...formData, drive: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="edit-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancel}
                            disabled={isSaving}
                            style={{ opacity: isSaving ? 0.5 : 1 }}
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={isSaving}
                            style={{ opacity: isSaving ? 0.7 : 1 }}
                        >
                            {isSaving ? 'APLICANDO CAMBIOS...' : 'GUARDAR CAMBIOS'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};