class URLService {
    static slugify(title) {
        return title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
    }
}

export default URLService