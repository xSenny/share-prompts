'use client';
import Profile from "@components/Profile";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import user from "@models/user";
import {useRouter} from "next/navigation";

const MyProfile = () => {
    const router = useRouter()
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt');
        if (hasConfirmed) {
            try  {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const {data: session} = useSession();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);


    return (
        <div>
            <Profile
                name='My'
                desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default MyProfile;