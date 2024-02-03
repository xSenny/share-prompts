'use client';
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Form from '@components/Form'
import user from "@models/user";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const {data: session} = useSession();
    const router = useRouter();
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
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
            type={"Create"}
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt;