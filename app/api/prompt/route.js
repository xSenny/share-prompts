import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async(req, res) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Content-Type', 'application/json');

        // Return the response
        return res.status(200).json(prompts);
    } catch (error) {
        return res.status(404).json(error)
    }
}