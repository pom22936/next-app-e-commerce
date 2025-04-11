import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-2xl pt-16 pb-10">
        <h2 className="text-3xl text-blue-700">ติดต่อเรา</h2>
        <p className="font-sarabun text-2xl">สวัสดี contact page</p>
        <p className="font-k2d text-2xl">สวัสดี contact page</p>
        <Separator className="mt-5"/>
        <div className="m-10">
            <Button variant="outline" asChild>
            <Link href="/">Go to Home Page</Link>
            </Button>
        </div>
        </div>
    );
}