import ProductList from "@/components/shared/product/product-lis"
import { getLatestProducts } from "@/lib/actions/product.action"

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  )
}

export default Homepage