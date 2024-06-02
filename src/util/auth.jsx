const logoutUser = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
}

export { logoutUser };