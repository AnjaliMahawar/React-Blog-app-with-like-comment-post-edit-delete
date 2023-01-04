
import httpServices from "./httpServices"

export const PostDetailService = () => {
    return httpServices.get(`/posts/getallposts`)
}
export const addPostService = (payload: FormData) => {
    return httpServices.post("/posts/createpost", payload)
}
export const updatePostService = (postId: number, payload: FormData) => {
    return httpServices.put(`/posts/updatepost/${postId}`, payload)
}
export const updateFetchPostService = (postId: number) => {
    return httpServices.get(`/posts/editpost/${postId}`)
}
export const deletePostService = (postId: number) => {
    return httpServices.delete(`posts/deletepost/${postId}`)
}
