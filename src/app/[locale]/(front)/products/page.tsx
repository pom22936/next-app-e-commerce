import AppProductDisplay from "@/components/app/AppProductDisplay";
import { getProductService } from "@/services/product-service";


export default async function Page() {
    const products = await getProductService()

    return (
        <div className="mx-auto max-w-4xl pt-18 pb-10">
            <p>product page</p>
            <AppProductDisplay products={products} />
        </div>
    );
}
