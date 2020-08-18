const LIMIT = 3;
const paginate = (array, page) => {
    page = page || 1;
    const totalPages = Math.ceil(array.length / LIMIT);
    const startPage = (page <= LIMIT) ? 1 : (page - LIMIT);
    const endPage = Math.min(startPage + (LIMIT - 1), totalPages);
    return {
        totalPages,
        startPage,
        endPage,
        items: array.slice((page - 1) * LIMIT, page * LIMIT),
        totalItems: array.length
    };
};
module.exports = {
    paginate
};