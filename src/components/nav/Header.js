import React, { useState } from 'react';
import { Menu } from "antd";
import {
    AppstoreAddOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "../../assets/css/components/nav/header.css";
const { Item, SubMenu } = Menu;

const Header = ({ userState, setUserState }) => {
    const [current, setCurrent] = useState("home");

    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key)
    };

    const logout = () => {
        firebase.auth().signOut();
        setUserState(null);
        history.push("/login");
    };

    return (
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal" className="header">
            <Item key="home" icon={<AppstoreAddOutlined />} className="item">
                <Link className="link" to="/">Home</Link>
            </Item>

            {userState == null && (
                <Item key="register" icon={<UserAddOutlined />} className="item">
                    <Link className="link" to="/register">Register</Link>
                </Item>
            )}

            {userState == null && (
                <Item key="login" icon={<UserOutlined />} className="item">
                    <Link className="link" to="/login">Login</Link>
                </Item>
            )}

            {userState !== null && (
                <SubMenu 
                    icon={<SettingOutlined />}
                    title={userState.email && userState.email.split("@")[0]}
                    className="submenu"
                >
                    {userState && userState.role === "subscriber" && (
                        <Item className="option">
                            <Link to="/user/history">Dashboard</Link>
                        </Item>
                    )}

                    {userState && userState.role === "admin" && (
                        <Item className="option">
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </Item>
                    )}
                    <Item
                        className="option"
                        key="logout"
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        Logout
                    </Item>
                </SubMenu>
            )}
        </Menu>
    );
};

export default Header;