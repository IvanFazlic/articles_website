"use server";
import { db } from "@/db";

export default async function removeArticle(id: number): Promise<boolean> {
    try {
        await db.articles.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        console.error("Error deleting article:", error);
        return false;
    }
}
