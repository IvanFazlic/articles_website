import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  const categories = await db.categories.findMany();
  const renderCategories = categories.map((category) => {
    return (
      <div key={category.id} className="relative w-full h-[400px]">
        <Link href={`/categories/${category.catergory}`} className="relative block w-full h-full">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold font-inria-serif">
            {category.title}
          </h2>
        </Link>
      </div>
    );
  });
  
  
  return (
    <div>
      {renderCategories}
    </div>
  );
}
