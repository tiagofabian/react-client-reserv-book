import axios from "axios";

export const getBook = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/book/${slug}`);

export const removeBook = async (slug, authtoken) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/book/${slug}`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );

export const updateBook = async (slug, book, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/book/${slug}`, book, {
        headers: {
            authtoken,
        },
    });

export const createBook = async (book, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/book`, book, {
        headers: {
            authtoken,
        },
    });

export const getBooks = async () =>
    await axios.get(`${process.env.REACT_APP_API}/books`);