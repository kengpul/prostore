import { getProductBySlug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>
}

const ProductDetailsPage = async ({ params }: Props) => {
    const { slug } = await params;

    const product = await getProductBySlug(slug);
    if (!product) notFound();

    return (
        <div>{product.name}</div>
    )
}

export default ProductDetailsPage