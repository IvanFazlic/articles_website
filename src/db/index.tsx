import { PrismaClient, Articles, Categories } from "@prisma/client";
export type ArticleKeys = keyof Articles;
export type CategoryKeys = keyof Categories;

export const db = new PrismaClient({
    datasources:{
        db:{
            url : process.env.DATABASE_URL,
        }
    }
});

export const articleKeys: ArticleKeys[] = Object.keys(db.articles.fields) as (keyof Articles)[];
export const categoryKeys: CategoryKeys[] = Object.keys(db.categories.fields) as CategoryKeys[];

