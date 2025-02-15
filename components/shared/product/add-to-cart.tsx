"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { addItemToCard, removeItemFromCart } from "@/lib/actions/cart.action";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleAddToCard = async () => {
        startTransition(async () => {
            const res = await addItemToCard(item);

            if (!res.success) {
                toast({
                    variant: "destructive",
                    description: res.message
                })
                return;
            }

            toast({
                description: res.message,
                action: (
                    <ToastAction className="bg-primary text-white hover:bg-gray-800" altText="Go To Card" onClick={() => router.push("/cart")}>
                        Go to Cart
                    </ToastAction>
                )
            })
        })
    }

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);
            toast({
                variant: res.success ? "default" : "destructive",
                description: res.message
            })
            return;
        })
    }

    const existItem = cart && cart.items.find((x) => x.productId === item.productId);

    return existItem ? (
        <div>
            <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
                {isPending ?
                    (<Loader className="w-4 h-4 animate-spin" />) :
                    (<Minus className="w-4 h-4" />)
                }

            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type="button" variant="outline" onClick={handleAddToCard}>
                {isPending ?
                    (<Loader className="w-4 h-4 animate-spin" />) :
                    (<Plus className="w-4 h-4" />)
                }
            </Button>
        </div>
    ) : (
        <Button className="w-full" type="button" onClick={handleAddToCard}>
            {isPending ?
                (<Loader className="w-4 h-4 animate-spin" />) :
                (<Plus className="w-4 h-4" />)
            }
            Add To Card
        </Button>
    )
}

export default AddToCart