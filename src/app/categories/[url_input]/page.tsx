import { db } from '@/db'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticleParams{
    params:{
        url_input : string
    }
}
interface Articles{
    id:number   
    title:string
    author:string
    topImage:string
    middleImage:string
    bottomImage:string
    paragraphText:string
    category:string
}

export default async function DymanicArticles({ params }: ArticleParams){
    const articles:Articles[] = await db.articles.findMany()
    
    if(articles.length <= 0){
        return notFound();
    }
    const renderedArticles = articles.map(article =>{
        return (
            <div key={article.id} className="relative">
                <Link href={`/articles/${article.id}`}>
                    <Image 
                        src={article.topImage} 
                        alt={article.author} 
                        width={800}
                        height={450}
                        className="w-full h-auto"
                    />
                    <h2 className="absolute bottom-0 left-0 bg-black bg-opacity-15 text-white text-lg p-3">
                        {article.title}
                    </h2>
                </Link>
            </div>
        )
    })
    
    return (
        <div className="grid grid-cols-2">
            {renderedArticles}
        </div>
    )
}