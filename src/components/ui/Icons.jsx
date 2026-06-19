import {
    Package,
    CheckCircle,
    Clock,
    Truck,
    Play,
    Square,
    MapPin,
    User,
    LogOut,
    Menu,
    AlertTriangle,
    Camera,
    Check,
    ChevronRight,
    ChevronDown,
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Settings,
    Bell,
    Search,
    Filter,
    Download,
    Upload,
    RefreshCw,
    Home,
    ClipboardList,
    Map,
    BarChart3,
    History
} from 'lucide-react';

// Componente wrapper pra padronizar tamanhos
export const Icon = ({ icon: IconComponent, size = 20, ...props }) => (
    <IconComponent size={size} {...props} />
);

// Ícones específicos já configurados
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

export default Icons;