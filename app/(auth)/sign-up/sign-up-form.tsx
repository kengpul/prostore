"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { signUp } from "@/lib/actions/user.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const CredentialsSignUpForm = () => {
    const [data, action] = useActionState(signUp, {
        success: false,
        message: ""
    })

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const SignupButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending} className="w-full" variant="default">
                {pending ? "Submitting,,," : "Sign up"}
            </Button>
        )
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
            <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        defaultValue={signUpDefaultValues.name}
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={signUpDefaultValues.email}
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        defaultValue={signUpDefaultValues.password}
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        autoComplete="confirmPassword"
                        defaultValue={signUpDefaultValues.confirmPassword}
                        onChange={() => { }}
                    />
                </div>
                <div>
                    <SignupButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account ? {" "}
                    <Link href="/sign-in" target="_self" className="link">Sign In</Link>
                </div>
            </div>
        </form>
    )
}

export default CredentialsSignUpForm