import { useState } from 'react';
import Header from '../../components/layout/Header';
import { StatusBadge } from '../../components/ui/Card';
import Card from '../../components/ui/Card';
import { Icons } from '../../components/ui/Icons';

export default function RouteView() {
    const [deliveries, setDeliveries] = useState([
        { id: 1, address: "Rua Augusta, 1500", client: "Maria Santos", status: "entregue", time: "08:15" },
        { id: 2, address: "Av. Paulista, 1000", client: "João Pereira", status: "entregue", time: "08:30" },
        { id: 3, address: "Rua Oscar Freire, 500", client: "Ana Costa", status: "em_andamento", time: null },
        { id: 4, address: "Rua dos Pinheiros, 200", client: "Pedro Alves", status: "pendente", time: null },
        { id: 5, address: "Rua Teodoro Sampaio, 800", client: "Carla Lima", status: "pendente", time: null },
    ]);

    const handleConfirmDelivery = (deliveryId) => {
        setDeliveries(prev => prev.map(del => {
            if (del.id === deliveryId) {
                return { ...del, status: 'entregue', time: new Date().toLocaleTimeString() };
            }
            if (del.id === deliveryId + 1 && del.status === 'pendente') {
                return { ...del, status: 'em_andamento' };
            }
            return del;
        }));
    };

    const completedCount = deliveries.filter(d => d.status === 'entregue').length;
    const currentDelivery = deliveries.find(d => d.status === 'em_andamento');
    const progressPercent = (completedCount / deliveries.length) * 100;

    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="app-container" style={{ background: 'var(--bg-secondary)', minHeight: '100vh' }}>
            <Header />

            <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
                {/* ========== CABEÇALHO DA ROTA ========== */}
                <Card style={{
                    background: 'linear-gradient(145deg, var(--primary-700), var(--primary-800))',
                    color: 'white',
                    border: 'none',
                    padding: '28px 24px',
                    marginBottom: 24,
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decoração de fundo */}
                    <div style={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        pointerEvents: 'none'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: -30,
                        left: -30,
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.03)',
                        pointerEvents: 'none'
                    }} />

                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 14,
                                background: 'rgba(255,255,255,0.12)',
                                backdropFilter: 'blur(4px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Icons.Truck size={26} color="var(--secondary-300)" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                                    Rota do Dia
                                </h2>
                                <p style={{ opacity: 0.7, fontSize: 13, margin: '2px 0 0 0', textTransform: 'capitalize' }}>
                                    {today}
                                </p>
                            </div>
                        </div>

                        {/* Progresso visual */}
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 12,
                            padding: '14px 16px',
                            backdropFilter: 'blur(2px)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 500 }}>Progresso</span>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>
                                    {completedCount}/{deliveries.length} entregas
                                </span>
                            </div>
                            <div style={{
                                background: 'rgba(255,255,255,0.15)',
                                borderRadius: 6,
                                height: 8,
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${progressPercent}%`,
                                    height: '100%',
                                    background: 'var(--secondary-400)',
                                    borderRadius: 6,
                                    transition: 'width 0.5s ease'
                                }} />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ========== ENTREGA ATUAL ========== */}
                {currentDelivery && (
                    <Card style={{
                        marginBottom: 24,
                        borderLeft: '5px solid var(--secondary-400)',
                        padding: '24px',
                        background: 'var(--bg-primary)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Icons.MapPin size={16} color="var(--secondary-500)" />
                            <span style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: 'var(--secondary-600)',
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}>
                                Você está aqui
                            </span>
                        </div>

                        <h3 style={{
                            fontSize: 22,
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: 6
                        }}>
                            {currentDelivery.client}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: 15,
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                        }}>
                            <Icons.MapPin size={14} color="var(--text-muted)" />
                            {currentDelivery.address}
                        </p>

                        <button
                            onClick={() => handleConfirmDelivery(currentDelivery.id)}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, var(--secondary-400), var(--secondary-500))',
                                color: 'var(--primary-900)',
                                border: 'none',
                                borderRadius: 10,
                                fontWeight: 700,
                                fontSize: 15,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 12px rgba(212, 148, 42, 0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(212, 148, 42, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(212, 148, 42, 0.3)';
                            }}
                        >
                            <Icons.Check size={20} />
                            Confirmar Entrega
                        </button>

                        {/* Botão de reportar problema (secundário) */}
                        <button
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginTop: 10,
                                background: 'transparent',
                                color: 'var(--danger)',
                                border: '1px solid var(--danger)',
                                borderRadius: 10,
                                fontWeight: 600,
                                fontSize: 14,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(139, 58, 58, 0.05)'}
                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                            <Icons.AlertTriangle size={16} />
                            Reportar Problema
                        </button>
                    </Card>
                )}

                {/* ========== LISTA DE ENTREGAS ========== */}
                <div style={{ marginTop: 8 }}>
                    <h3 style={{
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 16,
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <Icons.ClipboardList size={20} color="var(--primary-600)" />
                        Todas as Entregas
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {deliveries.map((delivery, index) => {
                            const isActive = delivery.status === 'em_andamento';
                            const isCompleted = delivery.status === 'entregue';

                            return (
                                <Card
                                    key={delivery.id}
                                    style={{
                                        padding: '16px',
                                        opacity: isCompleted ? 0.65 : 1,
                                        borderLeft: isActive ? '4px solid var(--secondary-400)' : '4px solid transparent',
                                        transition: 'all 0.3s',
                                        background: isActive ? 'var(--secondary-50)' : 'var(--bg-primary)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        {/* Número da entrega */}
                                        <div style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 10,
                                            background: isCompleted
                                                ? 'var(--primary-100)'
                                                : isActive
                                                    ? 'var(--secondary-200)'
                                                    : 'var(--bg-tertiary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: 14,
                                            color: isActive ? 'var(--secondary-700)' : 'var(--text-muted)',
                                            flexShrink: 0
                                        }}>
                                            {isCompleted ? (
                                                <Icons.Check size={16} color="var(--primary-600)" />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        {/* Informações do cliente */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                                color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                                                margin: 0,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {delivery.client}
                                            </p>
                                            <p style={{
                                                fontSize: 13,
                                                color: 'var(--text-secondary)',
                                                margin: '3px 0 0 0',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {delivery.address}
                                            </p>
                                        </div>

                                        {/* Status e horário */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                            {delivery.time && (
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                                                    {delivery.time}
                                                </span>
                                            )}
                                            <StatusBadge status={delivery.status} />
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}