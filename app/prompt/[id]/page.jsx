'use client';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Form from '@components/Form'
import user from "@models/user";
import Prompt from "@components/Prompt";

const SeePrompt = ({params}) => {
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
        author: ''
    });
    const searchParams = useSearchParams();
    const promptId = params.id;

    useEffect(() => {
        const getPromptDetails = async () => {
            if (!promptId) return alert("No prompt id!")
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                author: data.creator,
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId]);

    const {data: session} = useSession();
    const router = useRouter();
    return (
        // <Form
        //     type={"Update"}
        //     post={post}
        //     setPost={setPost}
        //     submitting={submitting}
        //     handleSubmit={updatePrompt}
        // />
        <Prompt prompt={post} />
    )
}

export default SeePrompt;