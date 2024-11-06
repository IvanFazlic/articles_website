import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticleParams {
    params: {
        url_input: string;
    };
    searchParams?: {
        page?: string;
    };
}

const PAGE_SIZE = 2; // Number of articles per page
const IMAGE_WIDTH = 400; // Desired image width

export default async function DynamicArticles({ params, searchParams }: ArticleParams) {
    const currentPage = parseInt(searchParams?.page || "1", 10);
    const offset = (currentPage - 1) * PAGE_SIZE;

    // Fetch one more article than PAGE_SIZE to determine if there’s a next page
    const articles = await db.articles.findMany({
        where: {
            category: {
                category: params.url_input,
            },
        },
        skip: offset,
        take: PAGE_SIZE + 1,
        orderBy: {
            date: 'desc',
        },
    });

    if (articles.length === 0) {
        return notFound();
    }

    const hasNextPage = articles.length > PAGE_SIZE;
    const displayedArticles = hasNextPage ? articles.slice(0, PAGE_SIZE) : articles;

    const renderedArticles = displayedArticles.map((article) => (
        <div key={article.id} className="relative group">
            <div className="overflow-hidden h-[60vh]"> {/* Updated height to 60% of viewport height */}
                <Image
                    src={article.topImage}
                    alt={article.title}
                    width={IMAGE_WIDTH}
                    height={225} // Set a specific height for the image
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                />
            </div>
            <div className="absolute inset-0 flex flex-col justify-between h-full p-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-white bg-opacity-90">
                <div className="h-1/2 flex items-center justify-center border-b border-gray-400">
                    <h1 className="text-black text-lg text-center">{article.title}</h1>
                </div>
                <div className="h-1/2 flex">
                    <div className="w-1/2 flex flex-col items-center justify-center border-r border-gray-300">
                        <Image src="/read.png" alt="read" width={70} height={70} />
                        <Link href={`/articles/${article.id}`} className="border-solid border-2 text-black py-1 px-4">
                            Read
                        </Link>
                    </div>
                    <div className="w-1/2 flex flex-col items-center justify-center border-l border-gray-300">
                        <Image src="/watch.png" alt="watch" width={70} height={70} />
                        <Link href={`/watch/${article.id}`} className="border-solid border-2 text-black py-1 px-4">
                            Watch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 w-full">{renderedArticles}</div>
            <div className="flex justify-center mt-8 space-x-4"> {/* Adjusted to space-x-4 for better gap and centering */}
                {currentPage > 1 ? (
                    <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 border border-gray-300 rounded">
                        Previous
                    </Link>
                ) : (
                    <span className="px-4 py-2 border border-gray-300 rounded text-gray-400 cursor-not-allowed">
                        Previous
                    </span>
                )}
                {hasNextPage ? (
                    <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 border border-gray-300 rounded">
                        Next
                    </Link>
                ) : (
                    <span className="px-4 py-2 border border-gray-300 rounded text-gray-400 cursor-not-allowed">
                        Next
                    </span>
                )}
            </div>
        </div>
    );
}
