const POSTS_PER_PAGE = 10;

export const getPaginationProps = (allPosts, page = 1) => {
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const posts = allPosts.slice(startIndex, endIndex);

    return {
        posts,
        currentPage: page,
        totalPages,
    };
};
