"use client"
import React, {  useState, useEffect } from "react"

export const PostsContext = React.createContext()

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/get-all-posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        setPosts(data.posts)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }

    fetchPosts()
  }, [])

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost])
  }

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  )
}
