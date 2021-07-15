
module.exports = {
   
    cleanSensitiveData: function (data) {
        (data.password) ? data.password = "" : data;
        return data;
    },
    getPagination : (page, size) => {
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    },
    getPagingData : (length, page, limit) => {
        console.log(length, page, limit)
        const total = length;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(total / limit);
        const pageMeta = {};
        pageMeta.size = limit;
        pageMeta.page = currentPage;
        pageMeta.total = total;
        pageMeta.totalPages = totalPages;
        return  pageMeta;
    }
}