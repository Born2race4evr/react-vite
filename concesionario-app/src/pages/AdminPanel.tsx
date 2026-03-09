import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCar, fetchCars, updateCar, deleteCar, type Car } from '../api/carsApi';
import { useAuthStore } from '../store/useAuthStore';
import './AdminPanel.css';

export const AdminPanel = () => {
    const { user, registeredUsers } = useAuthStore();
    const queryClient = useQueryClient();

    const { data: cars, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    });

    const addCarMutation = useMutation<Car, Error, Omit<Car, 'id'>>({
        mutationFn: createCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            alert('¡Vehículo añadido exitosamente a la flota!');
        },
    });

    const updateCarMutation = useMutation<Car, Error, Car>({
        mutationFn: updateCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            alert('¡Vehículo actualizado correctamente en boxes!');
        },
    });

    const deleteCarMutation = useMutation<number, Error, number>({
        mutationFn: deleteCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            alert('Vehículo desguazado de la base de datos.');
        },
    });

    if (!user) {
        return (
            <div className="access-denied">
                <h2 className="admin-header">ACCESO DENEGADO</h2>
                <p>Debes iniciar sesión o registrarte para acceder al panel de telemetría.</p>
            </div>
        );
    }

    const handleAddVehicle = () => {
        const brand = prompt('Ingreso a Boxes (1/3)\n\nIntroduce la MARCA del vehículo:');
        if (!brand) {
            alert('Maniobra cancelada. Falta la marca.');
            return;
        }

        const model = prompt('Ingreso a Boxes (2/3)\n\nIntroduce el MODELO del vehículo:');
        if (!model) {
            alert('Maniobra cancelada. Falta el modelo.');
            return;
        }

        const image = prompt('Ingreso a Boxes (3/3)\n\nIntroduce la URL de la imagen del vehículo:');
        if (!image) {
            alert('Maniobra cancelada. Falta la imagen.');
            return;
        }

        addCarMutation.mutate({ brand, model, image });
    };

    const handleEditVehicle = (car: Car) => {
        const newBrand = prompt(`Actualizar MARCA (actual: ${car.brand}):`, car.brand);
        if (newBrand === null) {
            alert('Edición cancelada.');
            return;
        }

        const newModel = prompt(`Actualizar MODELO (actual: ${car.model}):`, car.model);
        if (newModel === null) {
            alert('Edición cancelada.');
            return;
        }

        const newImage = prompt(`Actualizar URL de imagen (actual: ${car.image}):`, car.image);
        if (newImage === null) {
            alert('Edición cancelada.');
            return;
        }

        updateCarMutation.mutate({
            id: car.id,
            brand: newBrand || car.brand,
            model: newModel || car.model,
            image: newImage || car.image
        });
    };

    const handleDeleteVehicle = (car: Car) => {
        const confirmacion = prompt(`ADVERTENCIA: Vas a eliminar el ${car.brand} ${car.model}.\n\nEscribe "CONFIRMAR" para proceder:`);

        if (confirmacion === 'CONFIRMAR') {
            deleteCarMutation.mutate(car.id);
        } else {
            alert('Maniobra de eliminación cancelada.');
        }
    };

    return (
        <div className="admin-container">
            <h1 className="admin-header">
                TELEMETRÍA {user.role === 'admin' ? '[MODO ADMIN]' : '[PILOTO]'}
            </h1>

            <div className="admin-section">
                <div className="section-header-flex">
                    <h2 className="section-title">Gestión de Flota</h2>
                    <button onClick={handleAddVehicle} disabled={addCarMutation.isPending}>
                        {addCarMutation.isPending ? 'PROCESANDO...' : '+ NUEVO VEHÍCULO'}
                    </button>
                </div>

                {isLoading ? (
                    <p className="sync-text">Sincronizando datos con el servidor...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th className="table-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars?.map((car) => (
                                <tr key={car.id}>
                                    <td className="table-id">#{car.id}</td>
                                    <td className="table-brand">{car.brand}</td>
                                    <td className="table-model">{car.model}</td>
                                    <td className="table-actions">
                                        <button
                                            onClick={() => handleEditVehicle(car)}
                                            className="btn-edit"
                                            disabled={updateCarMutation.isPending}
                                        >
                                            EDITAR
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVehicle(car)}
                                            disabled={deleteCarMutation.isPending}
                                            className="btn-danger btn-delete"
                                        >
                                            ELIMINAR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {cars?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="empty-fleet">
                                        La pista está vacía. Añade un vehículo para empezar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {user.role === 'admin' && (
                <div className="admin-section">
                    <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Pilotos Registrados</h2>
                    <ul className="users-grid">
                        {registeredUsers.map((u, index) => (
                            <li key={index} className={`user-card ${u.role === 'admin' ? 'admin' : 'normal'}`}>
                                <div className="user-role">{u.role}</div>
                                <div className="user-name">{u.username}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};