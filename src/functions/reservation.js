import axios from "axios";

export const getReservartion = async (slug, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/reservation/${slug}`,
        {},
        {
            headers: {
                authtoken,
            },
        },
    );

export const removeReservation = async (slug, authtoken) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/reservation/${slug}`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );

export const updateReservation = (slug, reservation, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/reservation/${slug}`,
        reservation,
        {
            headers: {
                authtoken,
            },
        }
    );

export const createReservation = (reservation, authtoken) =>
await axios.post(`${process.env.REACT_APP_API}/reservation`, reservation, {
    headers: {
        authtoken,
    },
});

export const getReservartion = async () =>
    await axios.get(`${process.env.REACT_APP_API}/reservations`);