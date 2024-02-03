import Link from "next/link";

const Prompt = ({prompt}) => {
    return (
        <section className={"w-full max-w-full flex-start flex-col"}>

            <h1 className={"head_text text-left"}><span className={"blue_gradient"}>See <Link className={"orange_gradient"} href={`/profile/${prompt.author._id}?name=${prompt.author.username}`}>{prompt.author.username}</Link> prompt</span></h1>
            <p className={"desc text-left max-w-md"}>
                Create and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform. Click <Link href={"/"}>here!</Link>
            </p>
            <div className={"mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"}>
                <div><span className={"font-satoshi font-semibold text-base text-gray-700"}>Shared AI prompt:</span> {prompt.prompt}</div>
                <div><span className={"font-satoshi font-semibold text-base text-blue-700"}>Tag:</span> {prompt.tag}</div>
            </div>

        </section>
    )
}

export default Prompt;