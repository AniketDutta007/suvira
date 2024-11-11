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

import { signUpSchema } from "@/form-schema/auth";
import LoadingButton from "@/components/dashboard/loading-button";
import { handleSignUp } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import ErrorMessage from "@/components/dashboard/error-message";

import { useRouter, useSearchParams } from "next/navigation";

export default function SignUp() {
	const params = useSearchParams();
	const error = params.get("error");
	const router = useRouter();

	const [globalError, setGlobalError] = useState<string>("");

	useEffect(() => {
		if (!error) return;
		setGlobalError("An unexpected error occurred. Please try again.");
		router.replace("/auth/signup");
	}, [error, router]);

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
		try {
			const result = await handleSignUp(values);
			if (result.success) {
				router.replace("/");
			} else {
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
						Create an Account
					</CardTitle>
				</CardHeader>
				<CardContent>
					{globalError && <ErrorMessage error={globalError} />}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-2"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Enter your name"
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
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<LoadingButton
								pending={form.formState.isSubmitting}
							>
								Sign in
							</LoadingButton>
						</form>
					</Form>
					<div className="pt-5">
						<p className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<a href="/auth/signin" className="text-primary">
								Sign in
							</a>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
