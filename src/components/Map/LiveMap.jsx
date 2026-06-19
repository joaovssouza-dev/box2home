import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Corrigir bug dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ícone customizado para o motorista (caminhãozinho)
const driverIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" fill="#d4942a">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z" />
      <circle cx="16" cy="14" r="6" fill="white"/>
      <rect x="8" y="22" width="16" height="10" rx="3" fill="white"/>
      <circle cx="10" cy="34" r="3" fill="#334e68"/>
      <circle cx="22" cy="34" r="3" fill="#334e68"/>
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
                    'entregue': '#627d98',
                    'em_andamento': '#d4942a',
                    'pendente': '#829ab1',
                    'problema': '#8b3a3a'
                };

                const deliveryIcon = new L.Icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${statusColors[delivery.status]}">
              <circle cx="12" cy="12" r="10" opacity="0.3"/>
              <circle cx="12" cy="12" r="6"/>
            </svg>
          `),
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
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
                                color: statusColors[delivery.status],
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