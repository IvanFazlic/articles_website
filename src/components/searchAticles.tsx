"use server";
import { db } from "@/db";
import { Articles } from "@prisma/client";

export default async function searchArticles(id: number): Promise<Articles[] | undefined> {
    try {
        const articles = await db.articles.findMany({
            where: { id },
        });
        return articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return undefined;
    }
}
