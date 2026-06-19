import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../../components/ui/Icons';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'motorista'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signUp(form.email, form.password, form.name, form.role);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Erro ao criar conta');
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
            <div className="card" style={{ width: '100%', maxWidth: '440px' }}>
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
                        <Icons.User size={32} color="var(--primary-900)" />
                    </div>
                    <h1 style={{ color: 'var(--text-primary)', fontSize: '24px' }}>
                        Criar Conta
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        Cadastre-se no Box2Home
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label className="label">Nome completo</label>
                        <div style={{ position: 'relative' }}>
                            <Icons.User
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
                                type="text"
                                className="input"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Seu nome"
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Email</label>
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
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                placeholder="seu@email.com"
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Senha</label>
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
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Mínimo 6 caracteres"
                                style={{ paddingLeft: '44px' }}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label">Tipo de usuário</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <label style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${form.role === 'motorista' ? 'var(--secondary-400)' : 'var(--border)'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                background: form.role === 'motorista' ? 'var(--secondary-50)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="motorista"
                                    checked={form.role === 'motorista'}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    style={{ display: 'none' }}
                                />
                                <Icons.Truck size={24} color="var(--primary-600)" />
                                <div style={{ marginTop: '8px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                    Motorista
                                </div>
                            </label>

                            <label style={{
                                flex: 1,
                                padding: '12px',
                                border: `2px solid ${form.role === 'gestor' ? 'var(--secondary-400)' : 'var(--border)'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                background: form.role === 'gestor' ? 'var(--secondary-50)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="gestor"
                                    checked={form.role === 'gestor'}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    style={{ display: 'none' }}
                                />
                                <Icons.ClipboardList size={24} color="var(--primary-600)" />
                                <div style={{ marginTop: '8px', fontWeight: '500', color: 'var(--text-primary)' }}>
                                    Gestor
                                </div>
                            </label>
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
                        {loading ? 'Criando conta...' : 'Criar conta'}
                        {!loading && <Icons.ArrowRight size={18} />}
                    </button>

                    <div style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '14px'
                    }}>
                        Já tem conta?{' '}
                        <Link to="/login" style={{
                            color: 'var(--secondary-500)',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}>
                            Faça login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}