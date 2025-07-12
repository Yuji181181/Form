"use server";
import { redirect } from "next/navigation";
import { ContactSchema } from "@/validations/contact";

type ActionState = {
    success: boolean;
    error: {
        name?: string[];
        email?: string[];
    }
    serverError?: string;
};


export async function submitContactForm(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const name = formData.get("name");
    const email = formData.get("email");

    // バリデーション
    const validationResult = ContactSchema.safeParse({name, email});

    if (!validationResult.success) {
        const errors = validationResult.error.flatten().fieldErrors
        console.log("エラー",errors)
        return{
            success: false,
            error: {
                name: errors.name || [],
                email: errors.email || []
            }
        }
    }




    //DB

    console.log({name, email});
    redirect("/contacts/complete");
}