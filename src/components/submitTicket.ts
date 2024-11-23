"use server";
import { db } from "@/db";

export default async function submitTicket(email: string | null, description:string | null): Promise<boolean> {
    if(!email|| !description){
        return false;
    }
    try {
        await db.ticket.create({
            data:{
                email: email,
                description: description
            }
        });
        console.log("Created");
        
        return true;
    } catch (error) {
        console.error("Error deleting article:", error);
    }
    return false;
}
