import { FC } from "react";
import Head from "next/head";

const Home: FC = () => {
	return (
		<>
			<Head>
				<title>Create Next App Starter Template</title>
				<meta
					name="description"
					content="Generated with the Create Next App template"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="h-screen flex flex-col justify-center align-middle text-center">
					<h1 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 font-extrabold">
						Frontend Starter Template
					</h1>
					<h2 className="max-w-md mx-auto text-2xl">
						A Next.js Boilerplate with TypeScript, Tailwind CSS and testing
						suite enabled
					</h2>
				</div>
			</main>
		</>
	);
};

export default Home;
