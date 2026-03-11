import { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import './Profile.css';

export const UserProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        user: loggedInUser,
        registeredUsers,
        updateUserAvatar,
        updateUserContactInfo
    } = useAuthStore();

    // 1. Buscamos al usuario
    const displayUser = useMemo(() => {
        return username
            ? registeredUsers.find(u => u.username.toLowerCase() === username.toLowerCase())
            : loggedInUser;
    }, [username, registeredUsers, loggedInUser]);

    // 2. RETORNO TEMPRANO: Si no hay usuario, mostramos error y cortamos aquí.
    // Esto garantiza a TypeScript que de aquí en adelante 'displayUser' NO es null.
    if (!displayUser) {
        return (
            <div className="loader-text">
                <p>ERROR: UNIDAD_NO_IDENTIFICADA</p>
                <button onClick={() => navigate('/')} className="btn-return-command" style={{ marginTop: '20px' }}>
                    VOLVER AL GARAJE
                </button>
            </div>
        );
    }

    // A partir de aquí, TypeScript ya sabe que displayUser existe.
    const isOwnProfile = !username || username.toLowerCase() === loggedInUser?.username.toLowerCase();

    const expData = useMemo(() => {
        if (!displayUser.registrationDate) return { percent: 5, days: 0 };
        const start = new Date(displayUser.registrationDate).getTime();
        const now = new Date().getTime();
        const daysActive = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const percent = Math.min((daysActive / 30) * 100, 100);
        return { percent: Math.max(percent, 5), days: daysActive };
    }, [displayUser]);

    const [newContact, setNewContact] = useState({ type: '', value: '' });

    const handleImageChange = (file: File) => {
        if (!isOwnProfile || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_SIZE = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                } else {
                    if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    updateUserAvatar(compressedBase64);
                }
            };
            if (event.target?.result) img.src = event.target.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleAddContact = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContact.type || !newContact.value || !isOwnProfile) return;
        const updated = [...(displayUser.contactInfo || []), { id: Date.now(), ...newContact }];
        updateUserContactInfo(updated);
        setNewContact({ type: '', value: '' });
    };

    const handleDeleteContact = (id: number) => {
        if (!isOwnProfile) return;
        const filtered = (displayUser.contactInfo || []).filter(c => c.id !== id);
        updateUserContactInfo(filtered);
    };

    const roleTranslations: Record<string, string> = {
        admin: 'DIRECTOR',
        engineer: 'INGENIERO',
        pilot: 'PILOTO',
        rookie: 'NOVATO'
    };

    return (
        <div className="profile-modern-container">
            <header className="profile-hud-header">
                <div className="hud-title-group">
                    <span className="hud-tag">ID_PILOT_BIOMETRICS</span>
                    <h2 className="hud-main-title">{displayUser.username.toUpperCase()}</h2>
                </div>
                <div className="hud-status">
                    <span className="status-label">ESTADO DEL VÍNCULO:</span>
                    <span className="status-value pulse">SISTEMA_ESTABLE</span>
                </div>
            </header>

            <div className="profile-layout-grid">
                <aside className="profile-biometric-aside">
                    <div
                        className={`biometric-frame ${isOwnProfile ? 'editable' : ''}`}
                        onClick={() => isOwnProfile && fileInputRef.current?.click()}
                    >
                        {isOwnProfile && (
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        )}
                        {displayUser.avatar ? (
                            <img src={displayUser.avatar} className="bio-img" alt="Bio" />
                        ) : (
                            <div className="bio-placeholder">{displayUser.username[0].toUpperCase()}</div>
                        )}
                        {isOwnProfile && <div className="bio-overlay">ACTUALIZAR ADN VISUAL</div>}
                    </div>

                    <div className="rank-terminal-card">
                        <span className="terminal-label">RANGO_JERÁRQUICO</span>
                        <div className={`terminal-value role-color-${displayUser.role}`}>
                            {(roleTranslations[displayUser.role] || displayUser.role).toUpperCase()}
                        </div>
                    </div>

                    <div className="security-clearance">
                        <div className="clearance-label-group">
                            <span className="terminal-label">SINCRONIZACIÓN_PANTOCK</span>
                            <span className="exp-percentage">{Math.round(expData.percent)}%</span>
                        </div>
                        <div className="clearance-bar">
                            <div className="clearance-fill" style={{ width: `${expData.percent}%` }}></div>
                        </div>
                    </div>
                </aside>

                <section className="profile-telemetry-content">
                    <div className="content-card-header">
                        <h3>CANALES DE COMUNICACIÓN</h3>
                        <div className="header-line"></div>
                    </div>

                    <div className="contact-data-grid">
                        {(displayUser.contactInfo || []).length > 0 ? (
                            (displayUser.contactInfo || []).map((c) => (
                                <div key={c.id} className="data-chip">
                                    <div className="chip-content">
                                        <span className="chip-type">{c.type.toUpperCase()}</span>
                                        <span className="chip-value">{c.value}</span>
                                    </div>
                                    {isOwnProfile && (
                                        <button className="chip-delete" onClick={() => handleDeleteContact(c.id)}>×</button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-telemetry">NO HAY CANALES VINCULADOS</div>
                        )}
                    </div>

                    {isOwnProfile && (
                        <form className="profile-edit-form" onSubmit={handleAddContact}>
                            <div className="form-section-title">NUEVO REGISTRO DE TELEMETRÍA</div>
                            <div className="profile-form-grid">
                                <div className="form-group">
                                    <label className="form-label">TIPO DE CANAL</label>
                                    <input
                                        className="form-input"
                                        placeholder="Ej: DISCORD..."
                                        value={newContact.type}
                                        onChange={e => setNewContact({ ...newContact, type: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">DIRECCIÓN / USUARIO</label>
                                    <input
                                        className="form-input"
                                        placeholder="Ej: @usuario"
                                        value={newContact.value}
                                        onChange={e => setNewContact({ ...newContact, value: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-form-submit">VINCULAR DATO</button>
                        </form>
                    )}
                </section>
            </div>

            <footer className="profile-actions">
                <button onClick={() => navigate(-1)} className="btn-return-command">
                    SALIR DE LA CENTRAL
                </button>
            </footer>
        </div>
    );
};