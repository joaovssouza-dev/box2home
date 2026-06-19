import { useState, useEffect, useCallback } from 'react';
import { SIMULATED_PATH, MOCK_DELIVERIES } from '../data/mockData';

export function useSimulation() {
    const [isSimulating, setIsSimulating] = useState(false);
    const [driverPosition, setDriverPosition] = useState(null);
    const [simulationIndex, setSimulationIndex] = useState(0);
    const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);

    const startSimulation = useCallback(() => {
        setIsSimulating(true);
        setSimulationIndex(0);
        setDeliveries(MOCK_DELIVERIES.map(d => ({ ...d, status: 'pendente' })));
    }, []);

    const stopSimulation = useCallback(() => {
        setIsSimulating(false);
    }, []);

    useEffect(() => {
        if (!isSimulating) return;

        const interval = setInterval(() => {
            if (simulationIndex >= SIMULATED_PATH.length) {
                setIsSimulating(false);
                return;
            }

            // Atualiza posição
            setDriverPosition(SIMULATED_PATH[simulationIndex]);

            // Atualiza status das entregas
            setDeliveries(prev => prev.map((del, i) => {
                if (i === simulationIndex - 1) {
                    return { ...del, status: 'entregue', time: new Date().toLocaleTimeString() };
                }
                if (i === simulationIndex) {
                    return { ...del, status: 'em_andamento' };
                }
                return del;
            }));

            setSimulationIndex(prev => prev + 1);
        }, 3000); // 3 segundos entre pontos

        return () => clearInterval(interval);
    }, [isSimulating, simulationIndex]);

    const completedCount = deliveries.filter(d => d.status === 'entregue').length;
    const totalCount = deliveries.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return {
        isSimulating,
        driverPosition,
        deliveries,
        startSimulation,
        stopSimulation,
        metrics: {
            completedCount,
            totalCount,
            progressPercent,
            pendingCount: totalCount - completedCount
        }
    };
}