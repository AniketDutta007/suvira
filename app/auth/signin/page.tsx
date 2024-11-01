"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/form-schema/auth";
import LoadingButton from "@/components/loading-button";
import { handleCredentialsSignin } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/error-message";

import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
	const params = useSearchParams();
	const error = params.get("error");
	const router = useRouter();

	const [globalError, setGlobalError] = useState<string>("");

	useEffect(() => {
		if (!error) return;
		setGlobalError("An unexpected error occurred. Please try again.");
		router.replace("/auth/signin");
	}, [error, router]);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof signInSchema>) => {
		try {
			const result = await handleCredentialsSignin(values);
			if (result && result.message) {
				setGlobalError(result.message);
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			console.error("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div className="h-full grow flex items-center justify-center p-4">
			<Card className="w-full max-w-[400px]">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-primary">
						Welcome Back
					</CardTitle>
				</CardHeader>
				<CardContent>
					{globalError && <ErrorMessage error={globalError} />}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-5"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter your email address"
												autoComplete="off"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Submit button will go here */}
							<LoadingButton
								pending={form.formState.isSubmitting}
							>
								Sign in
							</LoadingButton>
						</form>
					</Form>
					<div className="pt-5">
						<p className="text-center text-sm text-muted-foreground">
							Don&#39;t have an account?{" "}
							<a href="/auth/signup" className="text-primary">
								Create Account
							</a>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
