import Image from "next/image";

export default function Tapeout() {
    return (
    <div className="w-full grid grid-cols-12">
        <main className="lg:py-sm px-sm py-md mt-3xs-xl col-span-12 bg-secondary-0 dark:bg-secondary-1000 overflow-hidden rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5">
            <div className="flex flex-row">
                <h1 className="text-3xl font-bold mr-4">Has EE194 Taped Out Yet?</h1>
                <h1 className="text-3xl font-bold text-red-600">No.</h1>
                {/* <h1 className="text-3xl font-bold text-green-600">Tes.</h1> */}
            </div>
            <div className="flex flex-row">
                <Image src="/wlb_2.gif" alt="jim what are we doing here </3" width={616} height={346} style={{width: "100%"}}></Image>
            </div>
        </main>
    </div>)
}
