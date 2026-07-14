import { LastEarnedPage } from "./components/LastEarnedPage";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    return <LastEarnedPage recordId={id} />;
}