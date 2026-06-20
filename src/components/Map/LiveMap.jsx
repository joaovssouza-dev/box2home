import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Corrigir bug dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Novo ícone do motorista (caminhão elegante)
const driverIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
      <ellipse cx="16" cy="39" rx="12" ry="3" fill="#102a43" opacity="0.1"/>
      <rect x="3" y="14" width="26" height="16" rx="3" fill="#334e68"/>
      <path d="M21 10h6l4 8v12h-6V16l-4-6z" fill="#486581"/>
      <rect x="22" y="12" width="6" height="6" rx="1.5" fill="#bcccdc" opacity="0.7"/>
      <rect x="5" y="20" width="16" height="6" rx="2" fill="#d4942a"/>
      <rect x="5" y="20" width="16" height="2" fill="#e5ab4a" opacity="0.5"/>
      <circle cx="10" cy="32" r="5" fill="#102a43"/>
      <circle cx="10" cy="32" r="3.5" fill="#627d98"/>
      <circle cx="10" cy="32" r="1.5" fill="#bcccdc"/>
      <circle cx="24" cy="32" r="5" fill="#102a43"/>
      <circle cx="24" cy="32" r="3.5" fill="#627d98"/>
      <circle cx="24" cy="32" r="1.5" fill="#bcccdc"/>
      <rect x="29" y="18" width="2" height="4" rx="1" fill="#f0c376"/>
      <rect x="21" y="21" width="5" height="5" rx="1" fill="#bcccdc" opacity="0.5"/>
    </svg>
  `),
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42]
});

export default function LiveMap({ driverPosition, deliveries }) {
    const defaultCenter = [-23.5505, -46.6333];

    return (
        <MapContainer
            center={driverPosition || defaultCenter}
            zoom={14}
            style={{ height: '450px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marcadores das entregas */}
            {deliveries.map(delivery => {
                const statusColors = {
                    'entregue': { main: '#627d98', light: '#d9e2ec' },
                    'em_andamento': { main: '#d4942a', light: '#fdefd4' },
                    'pendente': { main: '#829ab1', light: '#d9e2ec' },
                    'problema': { main: '#8b3a3a', light: '#fce4e4' },
                };
                const { main, light } = statusColors[delivery.status] || statusColors['pendente'];

                const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="17" r="13" fill="#102a43" opacity="0.15"/>
          <circle cx="16" cy="16" r="13" fill="${light}"/>
          <circle cx="16" cy="16" r="10" fill="${main}"/>
          ${delivery.status === 'entregue' ? '<path d="M11 16l3.5 3.5 6.5-6.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' : ''}
          ${delivery.status === 'em_andamento' ? '<circle cx="16" cy="16" r="4" fill="white"/>' : ''}
          ${delivery.status === 'pendente' ? '<circle cx="16" cy="16" r="3" fill="white" opacity="0.7"/>' : ''}
          ${delivery.status === 'problema' ? '<path d="M16 11v5" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="16" cy="20" r="1.5" fill="white"/>' : ''}
        </svg>`;

                const deliveryIcon = new L.Icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(markerSvg),
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                return (
                    <Marker
                        key={delivery.id}
                        position={[delivery.lat, delivery.lng]}
                        icon={deliveryIcon}
                    >
                        <Popup>
                            <strong>{delivery.client}</strong><br />
                            {delivery.address}<br />
                            <span style={{
                                color: main,
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}>
                                {delivery.status.replace('_', ' ')}
                            </span>
                        </Popup>
                    </Marker>
                );
            })}

            {/* Motorista em movimento */}
            {driverPosition && (
                <Marker position={driverPosition} icon={driverIcon}>
                    <Popup>🚚 Motorista em rota</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}