import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../ui/Icons';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { profile, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <header style={{
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border)',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div className="flex items-center gap-3">
                <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--secondary-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icons.Truck size={20} color="var(--primary-900)" />
                </div>
                <div>
                    <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                        Box2Home
                    </h1>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {profile?.role === 'gestor' ? 'Painel do Gestor' : 'Painel do Motorista'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {profile?.name}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {profile?.role}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="btn btn-ghost"
                    style={{ padding: '8px 12px' }}
                    title="Sair"
                >
                    <Icons.LogOut size={18} />
                </button>
            </div>
        </header>
    );
}