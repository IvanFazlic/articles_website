import {db} from "@/db"
import { notFound } from "next/navigation"
interface Article{
    params:{
        url_id: string
    }
}
export default async function ArticlesPage({params} : Article){
    const article = await db.articles.findFirst({
        where:{
            id : parseInt(params.url_id) 
        }
    })
    if(article == null){
        return notFound()
    }
    return (
        <div>
            {article.title}
        </div>
    )
}