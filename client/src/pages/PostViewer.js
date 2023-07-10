
const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    history.push("/login");
};

<div className="navbar">
    <div className="links">
        {!authState.status ? (
        <>
            <Link to="/login"> Login</Link>
            <Link to="/registration"> Registration</Link>
        </>
        ) : (
        <>
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> Create A Post</Link>
        </>
        )}
    </div>
    <div className="loggedInContainer">
        <h1>{authState.username} </h1>
        {authState.status && <button onClick={logout}> Logout</button>}
    </div>
</div>