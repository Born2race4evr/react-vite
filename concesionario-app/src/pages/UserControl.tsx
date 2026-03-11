import { useState } from 'react';
import { useAuthStore, type Role } from '../store/useAuthStore';
import './AdminPanel.css';

export const UserControl = () => {
    const { registeredUsers, removeUser, updateUserRole, user: currentUser } = useAuthStore();
    const [expellingId, setExpellingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const handleExpel = (targetUsername: string) => {
        if (targetUsername === currentUser?.username) return;

        setExpellingId(targetUsername);
        setTimeout(() => {
            removeUser(targetUsername);
            setExpellingId(null);
        }, 800);
    };

    const handleRoleChange = (targetUsername: string, newRole: Role) => {
        if (targetUsername === currentUser?.username) return;

        setUpdatingId(targetUsername);
        setTimeout(() => {
            updateUserRole(targetUsername, newRole);
            setUpdatingId(null);
        }, 600);
    };

    const getRoleLabel = (role: string) => {
        switch (role) {
            case 'admin': return 'DIRECTOR';
            case 'engineer': return 'INGENIERO';
            case 'pilot': return 'PILOTO';
            default: return 'NOVATO';
        }
    };

    return (
        <div className="admin-section">
            <div className="admin-header">
                <h2 className="section-title">CENTRAL DE INTELIGENCIA / <span>USUARIOS</span></h2>
                <p className="admin-subtitle">RADAR DE PERSONAL Y CONTROL DE ACCESOS</p>
            </div>

            <div className="users-grid">
                {registeredUsers.length > 0 ? (
                    registeredUsers.map((u) => {
                        const isMe = u.username === currentUser?.username;
                        const isExpelling = expellingId === u.username;
                        const isUpdating = updatingId === u.username;

                        // Si eres tú mismo, siempre estás online en tu pantalla. Si es otro, leemos su estado.
                        const isOnline = isMe || u.isOnline;

                        return (
                            <div
                                className={`user-id-card ${isMe ? 'user-card-me' : ''} ${isExpelling ? 'user-card-expelling' : ''} ${isUpdating ? 'user-card-updating' : ''}`}
                                key={u.username}
                            >
                                <div className="user-card-header">
                                    <div className="status-container">
                                        <span className={isOnline ? "status-dot-active" : "status-dot-offline"}></span>
                                        <span className={`status-text ${!isOnline ? 'offline' : ''}`}>
                                            {isOnline ? 'EN LÍNEA' : 'DESCONECTADO'}
                                        </span>
                                    </div>
                                    <span className={`role-badge ${u.role}`}>
                                        {getRoleLabel(u.role)}
                                    </span>
                                </div>

                                <div className="user-card-body">
                                    <div className="user-avatar-placeholder">
                                        {u.avatar ? (
                                            <img
                                                src={u.avatar}
                                                alt={u.username}
                                                className={`user-card-avatar ${!isOnline ? 'avatar-offline' : ''}`}
                                            />
                                        ) : (
                                            <span className={`avatar-initial ${!isOnline ? 'offline' : ''}`}>
                                                {u.username.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className={`user-name-display ${!isOnline ? 'offline' : ''}`}>
                                        {u.username.toUpperCase()}
                                    </h3>

                                    {!isMe && (
                                        <div className="role-selector-container">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.username, e.target.value as Role)}
                                                disabled={isUpdating || isExpelling}
                                                className="role-select"
                                            >
                                                <option value="engineer">INGENIERO</option>
                                                <option value="pilot">PILOTO</option>
                                                <option value="rookie">NOVATO</option>
                                            </select>
                                        </div>
                                    )}

                                    {isMe && (
                                        <p className="user-clearance-level">NIVEL DE ACCESO: MÁXIMO</p>
                                    )}
                                </div>

                                <div className="user-card-footer">
                                    <button
                                        onClick={() => handleExpel(u.username)}
                                        className="btn-expel-dynamic"
                                        disabled={isMe || isExpelling || isUpdating}
                                    >
                                        {isMe ? 'TU PERFIL (PROTEGIDO)' : isExpelling ? 'REVOCANDO...' : isUpdating ? 'ACTUALIZANDO...' : 'EXPULSAR DE LA ESCUDERÍA'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-garage-message">NO SE DETECTAN PILOTOS EN EL RADAR</div>
                )}
            </div>
        </div>
    );
};