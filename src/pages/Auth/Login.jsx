import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../../components/ui/Icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/');
        } catch (err) {
            setError('Email ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, var(--primary-800) 0%, var(--primary-900) 100%)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--secondary-400)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px'
                    }}>
                        <Icons.Truck color="var(--primary-900)" size={32} />
                    </div>
                    <h1 style={{ color: 'var(--text-primary)', fontSize: '24px' }}>
                        Box2Home
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Faça login para continuar
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Icons.Mail
                                style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)'
                                }}
                                size={18}
                            />
                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Senha
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Icons.Lock
                                style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)'
                                }}
                                size={18}
                            />
                            <input
                                type="password"
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Sua senha"
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px',
                            background: '#fce4e4',
                            color: 'var(--danger)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Icons.AlertTriangle size={16} />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                        {!loading && <Icons.ArrowRight size={18} />}
                    </button>

                    <div style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '14px'
                    }}>
                        Não tem conta?{' '}
                        <Link to="/register" style={{
                            color: 'var(--secondary-500)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}>
                            Cadastre-se
                        </Link>
                    </div>
                </form>

                <div style={{
                    marginTop: '24px',
                    padding: '12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                }}>
                    <strong>Demo:</strong><br />
                    Gestor: gestor@box2home.com / 123456<br />
                    Motorista: motorista@box2home.com / 123456
                </div>
            </div>
        </div>
    );
}