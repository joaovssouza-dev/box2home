import Header from '../../components/layout/Header';
import LiveMap from '../../components/map/LiveMap';
import Card, { MetricCard, StatusBadge } from '../../components/ui/Card';
import { Icons } from '../../components/ui/Icons';
import { useSimulation } from '../../hooks/useSimulation';

export default function GestorDashboard() {
    const {
        isSimulating,
        driverPosition,
        deliveries,
        startSimulation,
        stopSimulation,
        metrics
    } = useSimulation();

    return (
        <div className="app-container">
            <Header />

            <main className="container">
                {/* Header da página */}
                <div className="flex justify-between items-center" style={{ marginBottom: 24 }}>
                    <div>
                        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                            Rota do Dia
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                            Motorista: João Silva • 19/06/2026
                        </p>
                    </div>

                    <button
                        onClick={isSimulating ? stopSimulation : startSimulation}
                        className={`btn ${isSimulating ? 'btn-danger' : 'btn-primary'}`}
                    >
                        {isSimulating ? (
                            <><Icons.Square size={16} /> Parar Rastreamento</>
                        ) : (
                            <><Icons.Play size={16} /> Iniciar Rastreamento</>
                        )}
                    </button>
                </div>

                {/* Cards de métricas */}
                <div className="grid grid-cols-4 gap-4" style={{ marginBottom: 24 }}>
                    <MetricCard
                        icon={Icons.Truck}
                        title="Motorista"
                        value="João Silva"
                        subtitle="Em rota"
                        color="var(--primary-600)"
                    />
                    <MetricCard
                        icon={Icons.Package}
                        title="Total de Entregas"
                        value={metrics.totalCount}
                        subtitle="Na rota de hoje"
                        color="var(--text-muted)"
                    />
                    <MetricCard
                        icon={Icons.CheckCircle}
                        title="Concluídas"
                        value={metrics.completedCount}
                        subtitle={`${Math.round(metrics.progressPercent)}% concluído`}
                        color="var(--primary-700)"
                    />
                    <MetricCard
                        icon={Icons.Clock}
                        title="Pendentes"
                        value={metrics.pendingCount}
                        subtitle="Aguardando"
                        color="var(--warning)"
                    />
                </div>

                {/* Barra de progresso */}
                <Card style={{ marginBottom: 24 }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            Progresso da Rota
                        </span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                            {metrics.completedCount}/{metrics.totalCount} entregas
                        </span>
                    </div>
                    <div style={{
                        background: 'var(--bg-tertiary)',
                        borderRadius: 8,
                        height: 8,
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${metrics.progressPercent}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--primary-600), var(--primary-400))',
                            borderRadius: 8,
                            transition: 'width 0.5s ease'
                        }} />
                    </div>
                </Card>

                {/* Mapa */}
                <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
                    <LiveMap driverPosition={driverPosition} deliveries={deliveries} />
                </Card>

                {/* Lista de entregas */}
                <Card>
                    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
                        Entregas da Rota
                    </h3>
                    <div className="flex flex-col gap-3">
                        {deliveries.map((delivery, index) => (
                            <div
                                key={delivery.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    borderRadius: 8,
                                    background: delivery.status === 'em_andamento' ? 'var(--secondary-50)' : 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                    opacity: delivery.status === 'pendente' ? 0.6 : 1
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <span style={{
                                        fontWeight: 700,
                                        color: 'var(--text-muted)',
                                        fontSize: 14,
                                        minWidth: 24
                                    }}>
                                        #{index + 1}
                                    </span>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                            {delivery.client}
                                        </p>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                                            {delivery.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {delivery.time && (
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                            {delivery.time}
                                        </span>
                                    )}
                                    <StatusBadge status={delivery.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    );
}