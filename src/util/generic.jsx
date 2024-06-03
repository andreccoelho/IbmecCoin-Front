const get_page = (url) => {
    const parts = url.split('/');
    return parts[3];
}

export { get_page };