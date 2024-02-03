'use client';

import PromptCard from "@components/PromptCard";
import {useEffect, useState} from "react";

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className={"mt-16 prompt_layout"}>
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {

    const [searchText, setSearchText] = useState()
    const [posts, setPosts] = useState([]);

    const [searchTimer, setSearchTimer] = useState(null)
    const [results, setResults] = useState([]);
    const filterPosts = (text) => {
        const regex = new RegExp(text, "i");
        return posts.filter(
            (post) =>
                regex.test(post.creator.username) ||
                regex.test(post.tag) ||
                regex.test(post.prompt)
        );
    }
    const handleSearchChange = (e) => {
        clearTimeout(searchTimer);
        setSearchText(e.target.value)

        setSearchTimer(setTimeout(() => {
            setResults(filterPosts(searchText))
        }, 500))
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt');
            const data = await res.json();
            setPosts(data);
        }
        fetchPosts();
    }, []);

    const handleTagClick = (tag) => {
        setSearchText(tag)
        setResults(filterPosts(searchText))
    }

    return (
        <section className={"feed"}>
            <form className={"relative w-full flex-center"}>

                <input type={"text"} placeholder={"Search for a tag or a username"} value={searchText} onChange={(e) => handleSearchChange(e)} required className={"search_input peer"}/>

            </form>
            {searchText ? (
                <PromptCardList
                    data={results}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList
                    data={posts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    )
}

export default Feed;