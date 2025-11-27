const API_URL = 'http://localhost:4000/reservation';

export const createReservation = async (reservationData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(reservationData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al crear la reserva');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en createReservation:', error);
        throw error;
    }
};

export const getMyReservations = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al obtener reservas');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en getMyReservations:', error);
        throw error;
    }
};
