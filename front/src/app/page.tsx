import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

export default function Home() {
    const router = useRouter();

    const handleToOrder = () => {
        router.push("/orders");
    };

    const handleToCreation = () => {
        router.push("/orders/create");
    };

    return (
        <div className='flex flex-col gap-2 row-start-2 items-center sm:items-stretch'>
            <Button className='flex flex-col sm:items-stretch' onClick={handleToOrder}>Create new order</Button>
            <Button className='flex flex-col sm:items-stretch' onClick={handleToCreation}>View orders</Button>
        </div>
    );
}