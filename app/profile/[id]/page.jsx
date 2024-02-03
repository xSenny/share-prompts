"use client";
import {useEffect, useState} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {

    const searchParams = useSearchParams();

    const [posts, setUserPosts] = useState([])
    const name = searchParams.get("name")


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile name={name} data={posts} desc={`See ${name}'s posts and admire them!`} />
    )

}

export default UserProfile;