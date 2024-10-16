import { db } from '@/db'
import Image from 'next/image';
import Link from 'next/link';

interface Article{
    params:{
        url_input : string
    }
}

export default async function DymanicArticles({ params }: Article){
    const articles = await db.articles.findMany({
        where:{
            category : params.url_input
        }
    }
    )
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