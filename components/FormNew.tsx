'use client'
import React, { useState } from 'react'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Form } from '@/components/ui/form'
import CustomInput from '@/components/CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'

type FormValues = z.infer<ReturnType<typeof authFormSchema>>;
const MyForm = ({ type }: { type: string }) => {
    const formSchema = authFormSchema(type);
    const form = useForm<FormValues>({
        //this form is an object here created by useForm hook imoported fro react-hook-form library
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [isLoading, setisLoading] = useState(false);
    //this is a state variable to check if the user is signed in or not
    const [user, setuser] = useState(false);
    async function onSubmit(values: FormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setisLoading(true);
        try {
            if (type === "sign-up") {
                // Register new user
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error("Registration error:", data.error);
                    return;
                }

                // If registration successful, sign in
                const signInResult = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    callbackUrl: "/",
                });

                if (signInResult?.error) {
                    console.error("Sign-in after registration error:", signInResult.error);
                }
            } else {
                // Sign in with credentials
                const result = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    callbackUrl: "/",
                    redirect: false,
                });

                if (result?.error) {
                    console.error("Authentication error:", result.error);
                }
            }
        } catch (err) {
            console.error("Error during authentication:", err);
        }
        setisLoading(false);
    }

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    const handleGitHubSignIn = () => {
        signIn("github", { callbackUrl: "/" });
    };
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
                    <Image //this section displays logo and h1
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                        Horizon
                    </h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {/**here we are checking for a user to be signed in using
             * ternary operators
             */}
                        {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
                        <p className="text-16 font-normal text-gray-600">
                            {user
                                ? "Link your account to get started"
                                : "Please enter your details"}
                        </p>
                    </h1>
                </div>
            </header>

            {/**This is a conditional rendering in react. If the user is signed in, it will show the plaid link component. Otherwise, it will show the form. */}
            {user ? (
                <div className="flex flex-col gap-4">{/* plaidlink */}</div>
            ) : (
                <>
                    {/* . The form object
          is created using the useForm hook from react-hook-form (defined on
          line 20). This is a common pattern in React where you want to pass all
          properties of an object as individual props to a component. The Form
          component from shadcn/ui is a wrapper that provides form context to
          its children. */}
                    <Form {...form}>
                        {/*This line is using the spread operator (...) to pass all the
          properties from the form object to the Form component*/}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === "sign-up" && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="firstName"
                                            label="First Name"
                                            placeholder="Enter your first name"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <CustomInput
                                        control={form.control}
                                        name="address1"
                                        label="Adress"
                                        placeholder="Enter your Address"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name="city"
                                        label="City"
                                        placeholder="Enter your city"
                                    />
                                    <div className="flex gap-4">
                                        <CustomInput
                                            control={form.control}
                                            name="state"
                                            label="state"
                                            placeholder="Enter your state"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="postalCode"
                                            label="Postal Code"
                                            placeholder="ex:302010"
                                        />
                                    </div>

                                </>
                            )}
                            <CustomInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                            />

                            <div className="flex flex-col gap-4">
                                <Button type="submit" disabled={isLoading} className="form-btn">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Loading...
                                        </>
                                    ) : type === "sign-in" ? ( // using ternary operators we are checking if the type is sign in than signin otherwise signup
                                        "Sign In"
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>

                                {/* Social Login Divider */}
                                <div className="relative flex items-center justify-center mt-4">
                                    <div className="border-t border-gray-300 w-full"></div>
                                    <div className="bg-white px-4 text-sm text-gray-500">Or continue with</div>
                                    <div className="border-t border-gray-300 w-full"></div>
                                </div>

                                {/* Social Login Buttons */}
                                <div className="flex gap-4 mt-4 justify-center">
                                    <Button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 p-2 rounded-lg"
                                    >
                                        <Image
                                            src="/icons/google.svg"
                                            width={20}
                                            height={20}
                                            alt="Google"
                                        />
                                        <span>Google</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleGitHubSignIn}
                                        className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 p-2 rounded-lg"
                                    >
                                        <Image
                                            src="/icons/github.svg"
                                            width={20}
                                            height={20}
                                            alt="GitHub"
                                        />
                                        <span>GitHub</span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === "sign-in"
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link
                            className="form-link"
                            href={type === "sign-in" ? "/sign-up" : "sign-in"}
                        >
                            {type === "sign-in" ? "Sign Up" : "Sign In"}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default MyForm;