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
            background: 'linear-gradient(135deg, var(--primary-800) 0%, var(--primary-900) 100%)',
            borderBottom: '2px solid var(--secondary-400)',
            padding: '0 32px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Logo e nome do sistema */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, var(--secondary-400), var(--secondary-300))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(212, 148, 42, 0.3)'
                }}>
                    <Icons.Truck size={24} color="var(--primary-900)" />
                </div>
                <div>
                    <h1 style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-0.5px',
                        lineHeight: 1.2
                    }}>
                        Box2Home
                    </h1>
                    <p style={{
                        fontSize: 12,
                        color: 'var(--secondary-300)',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {profile?.role === 'gestor' ? 'Painel do Gestor' : 'Painel do Motorista'}
                    </p>
                </div>
            </div>

            {/* Informações do usuário e logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Indicador de status online */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--secondary-400)',
                        boxShadow: '0 0 6px var(--secondary-400)'
                    }} />
                    <span style={{ color: 'var(--secondary-200)', fontSize: 12, fontWeight: 500 }}>
                        Online
                    </span>
                </div>

                {/* Separador */}
                <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.15)' }} />

                {/* Dados do usuário */}
                <div style={{ textAlign: 'right' }}>
                    <p style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'white',
                        lineHeight: 1.2
                    }}>
                        {profile?.name || 'Usuário'}
                    </p>
                    <p style={{
                        fontSize: 11,
                        color: 'var(--secondary-300)',
                        textTransform: 'capitalize',
                        fontWeight: 500
                    }}>
                        {profile?.role || 'sem perfil'}
                    </p>
                </div>

                {/* Botão de logout */}
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 16px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 10,
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        backdropFilter: 'blur(4px)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.15)';
                        e.target.style.borderColor = 'rgba(255,255,255,0.25)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                        e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                    }}
                    title="Sair do sistema"
                >
                    <Icons.LogOut size={16} />
                    Sair
                </button>
            </div>
        </header>
    );
}