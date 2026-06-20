import {
    Package, CheckCircle, Clock, Truck, Play, Square, MapPin,
    User, LogOut, Menu, AlertTriangle, Camera, Check,
    ChevronRight, ChevronDown, Plus, Edit, Trash2,
    Eye, EyeOff, Mail, Lock, ArrowRight, Settings,
    Bell, Search, Filter, Download, Upload, RefreshCw,
    Home, ClipboardList, Map, BarChart3, History
} from 'lucide-react';

// Componente wrapper
export const Icon = ({ icon: IconComponent, size = 20, ...props }) => (
    <IconComponent size={size} {...props} />
);

// Ícones Lucide já configurados
export const Icons = {
    Package: (props) => <Package size={20} {...props} />,
    CheckCircle: (props) => <CheckCircle size={20} {...props} />,
    Clock: (props) => <Clock size={20} {...props} />,
    Truck: (props) => <Truck size={20} {...props} />,
    Play: (props) => <Play size={20} {...props} />,
    Square: (props) => <Square size={20} {...props} />,
    MapPin: (props) => <MapPin size={20} {...props} />,
    User: (props) => <User size={20} {...props} />,
    LogOut: (props) => <LogOut size={20} {...props} />,
    Menu: (props) => <Menu size={20} {...props} />,
    AlertTriangle: (props) => <AlertTriangle size={20} {...props} />,
    Camera: (props) => <Camera size={20} {...props} />,
    Check: (props) => <Check size={20} {...props} />,
    Mail: (props) => <Mail size={20} {...props} />,
    Lock: (props) => <Lock size={20} {...props} />,
    ArrowRight: (props) => <ArrowRight size={20} {...props} />,
    Settings: (props) => <Settings size={20} {...props} />,
    Search: (props) => <Search size={20} {...props} />,
    Home: (props) => <Home size={20} {...props} />,
    ClipboardList: (props) => <ClipboardList size={20} {...props} />,
    Map: (props) => <Map size={20} {...props} />,
    BarChart3: (props) => <BarChart3 size={20} {...props} />,
};

/**
 * Ícones SVG customizados do Box2Home.
 * Designs modernos, limpos e consistentes com a identidade visual.
 */
export const CustomIcons = {
    /**
     * Caminhão de entrega – versão refinada, flat e elegante.
     */
    DriverTruck: (size = 32) => (
        <svg width={size} height={size * 1.3} viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Sombra suave no chão */}
            <ellipse cx="16" cy="39" rx="12" ry="3" fill="#102a43" opacity="0.1" />
            {/* Carroceria */}
            <rect x="3" y="14" width="26" height="16" rx="3" fill="#334e68" />
            {/* Cabine */}
            <path d="M21 10h6l4 8v12h-6V16l-4-6z" fill="#486581" />
            {/* Para-brisa */}
            <rect x="22" y="12" width="6" height="6" rx="1.5" fill="#bcccdc" opacity="0.7" />
            {/* Faixa decorativa na carroceria */}
            <rect x="5" y="20" width="16" height="6" rx="2" fill="#d4942a" />
            <rect x="5" y="20" width="16" height="2" fill="#e5ab4a" opacity="0.5" />
            {/* Rodas traseiras */}
            <circle cx="10" cy="32" r="5" fill="#102a43" />
            <circle cx="10" cy="32" r="3.5" fill="#627d98" />
            <circle cx="10" cy="32" r="1.5" fill="#bcccdc" />
            {/* Rodas dianteiras */}
            <circle cx="24" cy="32" r="5" fill="#102a43" />
            <circle cx="24" cy="32" r="3.5" fill="#627d98" />
            <circle cx="24" cy="32" r="1.5" fill="#bcccdc" />
            {/* Farol */}
            <rect x="29" y="18" width="2" height="4" rx="1" fill="#f0c376" />
            {/* Detalhe da cabine (janela lateral) */}
            <rect x="21" y="21" width="5" height="5" rx="1" fill="#bcccdc" opacity="0.5" />
        </svg>
    ),

    /**
     * Marcador de entrega no mapa – círculo com ícone interno baseado no status.
     * @param {string} status - 'pendente' | 'em_andamento' | 'entregue' | 'problema'
     * @param {number} size - tamanho do marcador
     */
    DeliveryMarker: (status = 'pendente', size = 28) => {
        const colors = {
            'pendente': { main: '#829ab1', light: '#d9e2ec' },
            'em_andamento': { main: '#d4942a', light: '#fdefd4' },
            'entregue': { main: '#627d98', light: '#d9e2ec' },
            'problema': { main: '#8b3a3a', light: '#fce4e4' },
        };
        const { main, light } = colors[status] || colors['pendente'];

        return (
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sombra */}
                <circle cx="16" cy="17" r="13" fill="#102a43" opacity="0.15" />
                {/* Anel externo */}
                <circle cx="16" cy="16" r="13" fill={light} />
                {/* Preenchimento */}
                <circle cx="16" cy="16" r="10" fill={main} />
                {/* Ícone interno */}
                {status === 'entregue' && (
                    <path d="M11 16l3.5 3.5 6.5-6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
                {status === 'em_andamento' && (
                    <circle cx="16" cy="16" r="4" fill="white" />
                )}
                {status === 'pendente' && (
                    <circle cx="16" cy="16" r="3" fill="white" opacity="0.7" />
                )}
                {status === 'problema' && (
                    <>
                        <path d="M16 11v5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="16" cy="20" r="1.5" fill="white" />
                    </>
                )}
            </svg>
        );
    },

    /**
     * Indicador de localização atual do motorista (pulsante sutil).
     */
    CurrentLocation: (size = 20) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#d4942a" opacity="0.25">
                <animate attributeName="r" from="8" to="14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.25" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="12" cy="12" r="5" fill="#d4942a" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
    ),
};

export default Icons;