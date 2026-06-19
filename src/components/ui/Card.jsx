export default function Card({ children, className = '', ...props }) {
    return (
        <div className={`card ${className}`} {...props}>
            {children}
        </div>
    );
}

export function MetricCard({ icon: Icon, title, value, subtitle, color = 'var(--primary-600)' }) {
    return (
        <Card>
            <div className="flex items-center gap-4">
                <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} color={color} />
                </div>
                <div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>
                        {title}
                    </p>
                    <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {value}
                    </p>
                    {subtitle && (
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </Card>
    );
}

export function StatusBadge({ status }) {
    const config = {
        'pendente': { label: 'Pendente', color: 'var(--text-muted)', bg: 'var(--bg-tertiary)' },
        'em_andamento': { label: 'Em Rota', color: 'var(--secondary-600)', bg: 'var(--secondary-100)' },
        'entregue': { label: 'Entregue', color: 'var(--primary-700)', bg: 'var(--primary-100)' },
        'problema': { label: 'Problema', color: 'var(--danger)', bg: '#fce4e4' },
        'concluida': { label: 'Concluída', color: 'var(--primary-700)', bg: 'var(--primary-100)' },
    };

    const { label, color, bg } = config[status] || config['pendente'];

    return (
        <span className="badge" style={{ color, background: bg }}>
            {label}
        </span>
    );
}