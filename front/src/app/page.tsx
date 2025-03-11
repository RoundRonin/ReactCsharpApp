import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className='flex flex-col gap-2 row-start-2 items-center sm:items-stretch'>
            <Link className='flex flex-col sm:items-stretch' href="/orders/create" passHref>
                <Button >Create new order</Button>
            </Link>
            <Link className='flex flex-col sm:items-stretch' href="/orders" passHref>
                <Button >View orders</Button>
            </Link>
        </div>
    );
}
