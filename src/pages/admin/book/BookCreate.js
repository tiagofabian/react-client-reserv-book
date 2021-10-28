import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {
    createBook,
    getBooks,
    removeBook,
} from "../../../functions/book";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/form/LocalSearch";


const BookCreate = ({ userState }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () =>
        getBooks().then((b) => setBooks(b.data))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createBook({ name: name }, userState.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadBooks();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.reponse.data);
            })
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeBook(slug, userState.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Create Book</h4>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                            <br />
                            <button className="btn btn-outline-primary">Save</button>
                        </div>
                    </form>
                    <LocalSearch keyword={keyword} setKeyword={setKeyword}/>
                    {books.filter(searched(keyword)).map((b) => {
                        <div className="alert alert-secondary" key={b._id}>
                            {b.name}
                            <span
                                onClick={() => handleRemove(b.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger"/>
                            </span>
                            <Link to={`/admin/book/${b.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning"/>
                                </span>
                            </Link>
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
};

export default BookCreate;
