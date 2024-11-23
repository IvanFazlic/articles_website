import { db } from "@/db";
import Link from "next/link";
import Video from "@/components/video"; 
import { notFound } from "next/navigation";

interface Category {
  id: number; 
  category: string;
  title: string;
  image: string; 
}

// Server Component to fetch data
async function fetchCategories() {
  try {
    const categories: Category[] = await db.categories.findMany();

    if (categories.length <= 0) {
      return null;
    }

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export default async function HomePage() {
  const categories = await fetchCategories(); // Fetch data server-side

  if (!categories) {
    return notFound(); // Show 404 if no categories found
  }

  const renderCategories = categories.map((category) => (
    <div key={category.id} className="relative w-full h-[400px] overflow-hidden border-b-2 border-black">
      <Link href={`/categories/${category.category}`} className="relative block w-full h-full">
        <Video src={category.image} />
        <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold font-inria-serif">
          {category.title}
        </h2>
      </Link>
    </div>
  ));

  return <div>{renderCategories}</div>;
}
