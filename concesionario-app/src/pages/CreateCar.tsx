import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCar, type Car } from '../api/carsApi';
import { useAuthStore } from '../store/useAuthStore';
import './CreateCar.css';

export const CreateCar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Car>>({
        brand: '',
        model: '',
        image: '',
        hp: '',
        acceleration: '',
        topSpeed: '',
        drive: ''
    });

    const [isSaving, setIsSaving] = useState(false);

    const createCarMutation = useMutation({
        mutationFn: createCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            navigate('/admin');
        }
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    setFormData(prev => ({ ...prev, image: compressedBase64 }));
                }
            };

            if (event.target && event.target.result) {
                img.src = event.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // LECTURA EN TIEMPO REAL: Pillamos al usuario exactamente en este milisegundo
        // Esto evita que React mande un dato vacío por culpa de sincronizaciones lentas
        const activeUser = useAuthStore.getState().user;

        setTimeout(() => {
            createCarMutation.mutate({
                ...(formData as Car),
                // Forzamos mayúsculas para mantener la estética HUD
                createdBy: activeUser?.username ? activeUser.username.toUpperCase() : 'OFICIAL'
            });
        }, 800);
    };

    return (
        <div className="workshop-overlay">
            <div className="workshop-container">
                <header className="workshop-header">
                    <h2 className="workshop-title">TALLER DE <span>ENSAMBLACIONES</span></h2>
                    <p className="workshop-subtitle">Registrando nueva telemetría de unidad</p>
                </header>

                <form className="workshop-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>MARCA</label>
                            <input
                                placeholder="Ej: NISSAN"
                                value={formData.brand}
                                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>MODELO</label>
                            <input
                                placeholder="Ej: GTR-R35"
                                value={formData.model}
                                onChange={e => setFormData({ ...formData, model: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="image-upload-section" onClick={() => fileInputRef.current?.click()}>
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} hidden />
                        <label>FOTOGRAFÍA DEL VEHÍCULO (Arrastra o haz clic)</label>
                        <div className="image-preview-box">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" />
                            ) : (
                                <div className="img-placeholder">+</div>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>POTENCIA</label>
                            <input
                                placeholder="Ej: 605 CV"
                                value={formData.hp}
                                onChange={e => setFormData({ ...formData, hp: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>0-100 KM/H</label>
                            <input
                                placeholder="Ej: 1.4s"
                                value={formData.acceleration}
                                onChange={e => setFormData({ ...formData, acceleration: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>VELOCIDAD MÁXIMA</label>
                            <input
                                placeholder="Ej: 320 KM/H"
                                value={formData.topSpeed}
                                onChange={e => setFormData({ ...formData, topSpeed: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>TRACCIÓN</label>
                            <input
                                placeholder="Ej: 4WD"
                                value={formData.drive}
                                onChange={e => setFormData({ ...formData, drive: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="workshop-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate('/admin')}
                            disabled={isSaving}
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={isSaving}
                            style={{ opacity: isSaving ? 0.7 : 1 }}
                        >
                            {isSaving ? 'GUARDANDO DATOS...' : 'GUARDAR CAMBIOS'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};