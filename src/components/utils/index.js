export const changePathRoute = (path) =>  window.history.replaceState(null, '', path);

export const getCountPostsByDay = (posts, userId) =>  {
    const date = new Date();
    const createDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return posts.filter(post => post.createDate === createDate && post.user.id === userId).length;
}