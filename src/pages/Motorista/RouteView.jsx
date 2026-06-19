import { useState } from 'react';
import Header from '../../components/layout/Header';
import { StatusBadge } from '../../components/ui/Card';
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

    return (
        <div className="app-container">
            <Header />

            <main style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
                {/* Card de resumo da rota */}
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary-700), var(--primary-800))',
                    color: 'white',
                    padding: 24,
                    borderRadius: 12,
                    marginBottom: 24
                }}>
                    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                        <Icons.Truck size={28} />
                        <div>
                            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Rota do Dia</h2>
                            <p style={{ opacity: 0.8, fontSize: 14 }}>19 de Junho, 2026</p>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: 8,
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>Progresso</span>
                        <span style={{ fontWeight: 700 }}>
                            {completedCount}/{deliveries.length} entregas
                        </span>
                    </div>
                </div>

                {/* Entrega atual em destaque */}
                {currentDelivery && (
                    <div style={{
                        padding: 20,
                        background: 'var(--secondary-50)',
                        borderRadius: 12,
                        marginBottom: 20,
                        border: '2px solid var(--secondary-300)'
                    }}>
                        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
                            <Icons.MapPin size={18} color="var(--secondary-600)" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--secondary-700)' }}>
                                ENTREGA ATUAL
                            </span>
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                            {currentDelivery.client}
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
                            {currentDelivery.address}
                        </p>
                        <button
                            onClick={() => handleConfirmDelivery(currentDelivery.id)}
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <Icons.Check size={18} />
                            Confirmar Entrega
                        </button>
                    </div>
                )}

                {/* Lista de todas as entregas */}
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
                    Todas as Entregas
                </h3>

                <div className="flex flex-col gap-2">
                    {deliveries.map((delivery, index) => (
                        <div
                            key={delivery.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '14px 16px',
                                background: delivery.status === 'em_andamento' ? 'var(--secondary-50)' : 'var(--bg-primary)',
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                opacity: delivery.status === 'entregue' ? 0.7 : 1
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span style={{
                                    fontWeight: 700,
                                    color: 'var(--text-muted)',
                                    fontSize: 13,
                                    minWidth: 20
                                }}>
                                    {index + 1}
                                </span>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                                        {delivery.client}
                                    </p>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                                        {delivery.address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {delivery.time && (
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                        {delivery.time}
                                    </span>
                                )}
                                <StatusBadge status={delivery.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}