import {connectToDB} from "@utils/database";
import User from "@models/user";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();

        const prompts = await User.findById(params.id);

        console.log(prompts)

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Could not find any user with this id.", {status: 500})
    }
}