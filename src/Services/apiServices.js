import axios from "axios"

export const BASE_URL = 'https://jsonplaceholder.typicode.com/'

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`)
        return response.data
    } catch (error) {
        console.error('Getting Error to fetch user Data', error);

    }
}

export const fetchPostCommentsTodosDataFromAPI = async (userId) => {
    try {
        const [posts, comments, todos] = await Promise.all([
            axios.get(`${BASE_URL}/posts?userId=${userId}`),
            axios.get(`${BASE_URL}/comments`),
            axios.get(`${BASE_URL}/todos`),
        ])
        return { posts: posts.data, comments: comments.data, todos: todos.data }
    } catch (error) {
        console.error('Getting error to fetch posts, comments, todos data!', error);

    }
}

export const fetchPostCommentsTodos = async (userId) => {
    return await fetchPostCommentsTodosDataFromAPI(userId)
}