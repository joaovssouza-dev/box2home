export const MOCK_DRIVER = {
    id: 1,
    name: "João Souza",
    route: {
        id: 1,
        date: "2026-06-18",
        status: "em_andamento"
    }
};

export const MOCK_DELIVERIES = [
    { id: 1, address: "Rua Augusta, 1500", client: "Maria Santos", status: "entregue", lat: -23.5614, lng: -46.6567, time: "08:15" },
    { id: 2, address: "Av. Paulista, 1000", client: "João Pereira", status: "entregue", lat: -23.5639, lng: -46.6543, time: "08:30" },
    { id: 3, address: "Rua Oscar Freire, 500", client: "Ana Costa", status: "em_andamento", lat: -23.5587, lng: -46.6725, time: "--:--" },
    { id: 4, address: "Rua dos Pinheiros, 200", client: "Pedro Alves", status: "pendente", lat: -23.5555, lng: -46.6800, time: "--:--" },
    { id: 5, address: "Rua Teodoro Sampaio, 800", client: "Carla Lima", status: "pendente", lat: -23.5512, lng: -46.6900, time: "--:--" },
];

// Rota simulada do motorista (caminho que ele vai percorrer)
export const SIMULATED_PATH = [
    [-23.5505, -46.6333],
    [-23.5614, -46.6567],
    [-23.5639, -46.6543],
    [-23.5587, -46.6725],
    [-23.5555, -46.6800],
    [-23.5512, -46.6900],
];