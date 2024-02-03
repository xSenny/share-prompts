import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export const forceRevalidate = (request) => {
    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(path);
};