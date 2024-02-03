'use client';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Form from '@components/Form'
import user from "@models/user";

const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId]);

    const {data: session} = useSession();
    const router = useRouter();
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if (!promptId) return alert('Prompt ID not found')
        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });
            if (res.ok) {
                router.push('/')
            }
        } catch (er) {
            console.log(er)
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type={"Update"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt;