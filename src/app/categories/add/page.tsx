import { redirect } from "next/navigation";
import { db } from "@/db";



export default function CategoriesAdd() {
    async function CreateCategory(formData: FormData) {
        'use server'
        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const image = formData.get('image') as string
        const categoryObject = await db.categories.create({
            data:{
                title:title,
                catergory:category,
                image:image
            }
        })
        console.log(categoryObject);
        redirect("/")
    }

    return (
      <div>
        <form action={CreateCategory}>
            <h3>Create a category</h3>
            <div>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                    type="text"
                    name="title"
                    id="title"
                    placeholder="input title"
                     />
                </div>
                <div>
                    <label htmlFor="category">Category: </label>
                    <input 
                    type="text"
                    name="category"
                    id="category"
                    placeholder="input category"
                     />
                </div>
                <div>
                    <label htmlFor="image">Image URL: </label>
                    <input 
                    type="text"
                    name="image"
                    id="image"
                    placeholder="input image url"
                    />
                </div>
            </div>
            <button style={{backgroundColor:"blue"}} type="submit">Add</button>
        </form>
      </div>
    );
  }
  