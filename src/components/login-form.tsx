"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { IconLoader } from "@tabler/icons-react"
import { toast } from "sonner"

// zod validation
const formSchema = z.object({
    email: z.string().min(1, { message: 'plese input email'}).email({message: 'email format incurrect'}).trim(),
    password: z.string().min(4, { message: 'password adleact 4 char'}).trim()
})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    // react hook form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    useEffect(() => {
        form.setFocus('email')
    }, [form])

    // login button
    const handleOnSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            // callbackURL: '/'
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log('body : ' + ctx.body);
            },
            onSuccess: async(ctx) => {
                //redirect to the dashboard or sign in page
                console.log('success : ', ctx.data)
                
                // get session แบบ client components
                const { data: session } = await authClient.getSession()
                if (session?.user.role === 'admin') {
                    router.replace('/dashboard')
                } else {
                    router.replace('/')
                }
                toast.success('welcome to app : ' + session?.user.name)
            },
            onError: (ctx) => {
                // display the error message
                // alert(ctx.error.message);
                toast.error(ctx.error.message)
            },
        })
    }

    const handleLogin = async () => {
        await authClient.signIn.email({
            email: 'user1@gmail.com',
            password: 'P@ssw0rd',
            // callbackURL: '/'
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log('body : ' + ctx.body);
            },
            onSuccess: async(ctx) => {
                //redirect to the dashboard or sign in page
                console.log('success : ', ctx.data)

                // get session แบบ client components
                const { data: session } = await authClient.getSession()
                if (session?.user.role === 'admin') {
                    router.replace('/dashboard')
                } else {
                    router.replace('/')
                }
            },
            onError: (ctx) => {
                // display the error message
                // alert(ctx.error.message);
                toast(ctx.error.message)
            },
        })
    }

    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
        <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
            Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                    <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="text@email.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                        </div>
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Password</FormLabel> */}
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                            { form.formState.isSubmitting ? <IconLoader className="animate-spin" >Waiting...</IconLoader> : 'Log in'}
                        </Button>
                    </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                        Sign up
                    </a>
                    </div>
                </form>
            </Form>
            <Button variant="outline" className="w-full" onClick={handleLogin}>
                Login with Google Hard code
            </Button>
        </CardContent>
        </Card>
    </div>
    )
}
