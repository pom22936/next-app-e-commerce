"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
    const router = useRouter()
    const handleSignUp = async () => {
        await authClient.signUp.email({
            email: 'admin@gmail.com',
            password: 'P@ssw0rd',
            name: 'admin admin'
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log('body : ' + ctx.body);
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                console.log('success : ', ctx.data);
                router.replace('/login')
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        })
    }

    return (
        <div>
            <Button onClick={handleSignUp}>สมัครสมาชิก</Button>
        </div>
    )
}

export default SignUpForm