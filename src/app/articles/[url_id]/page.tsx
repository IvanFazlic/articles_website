import {db} from "@/db"
import { notFound } from "next/navigation"
import DOMPurify from 'dompurify';
interface Article{
    params:{
        url_id: string
    }
}
export default async function ArticlesPage({params} : Article){
    const article = await db.articles.findUnique({
        where:{
            id : parseInt(params.url_id) 
        }
    })
    if(article == null){
        return notFound()
    }
    const text = article.paragraphText
    const renderText = JSON.parse(text)
    //check in array length is larger than 2
    const display = renderText.map((element: any, index: number) => {
        console.log(element);
        
        return (
            <div key={index}>
                {index == 0 ? article.topImage : ''}
                {index == renderText.length - 2 ? article.bottomImage : ''}
                <div dangerouslySetInnerHTML={{ __html: element }} />
                {element.includes('Key Takeaways') ? article.middleImage : ''}
            </div>
        );
    });
    
    return (
        <div>
            <h1 style={{fontSize:'2rem'}}>{article.title}</h1>
            {display}
        </div>
    );
}