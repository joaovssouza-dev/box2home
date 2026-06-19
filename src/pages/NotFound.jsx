import { Link } from 'react-router-dom';
import { Icons } from '../components/ui/Icons';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            background: 'var(--bg-secondary)'
        }}>
            <Icons.MapPin size={64} color="var(--text-muted)" />
            <h1 style={{ fontSize: 72, fontWeight: 800, color: 'var(--primary-300)', margin: '16px 0' }}>
                404
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-secondary)', marginBottom: 24 }}>
                Rota não encontrada
            </p>
            <Link to="/" className="btn btn-primary">
                <Icons.Home size={16} />
                Voltar ao início
            </Link>
        </div>
    );
}