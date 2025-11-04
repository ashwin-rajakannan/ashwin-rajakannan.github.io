import dynamic from "next/dynamic";

const SentimentDemo = dynamic(() => import("./SentimentDemoClient"), { ssr: false });

export default function Page() {
	return <SentimentDemo />;
}
