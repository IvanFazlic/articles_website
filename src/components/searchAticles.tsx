"use server";
import { db } from "@/db";
import { Articles } from "@prisma/client";

export default async function searchArticles(id: number) {
    try {
        const articles = await db.articles.findMany({
            where: { id },
        });

        return articles.map((article: Articles) => (
            <div key={article.id}>
                <h2>{article.title}</h2>
            </div>
        ));
    } catch (error) {
        console.error("Error fetching articles:", error);
        return null;
    }
}
