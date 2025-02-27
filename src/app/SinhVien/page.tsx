"use client";

import { Button } from "react-bootstrap";
import MyTable from '../../components/SinhVien/table'
import useSWR from "swr";
import ModalAdd from "@/components/SinhVien/modal_Add";
import { useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";

function SinhVien() {
    const url = "http://localhost:5000/sinhvien";
    async function deleteAll() {
        await fetch("http://localhost:5000/SinhVien/deleteAll", {
            method: "DELETE"
        }).then(token => token.json()).then(res => {
            console.log(res);
            toast.info("Xóa xong: " + res + " dòng!");
        });
        mutate([url]);
    }
    const [show, setShow] = useState<boolean>(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR(url, fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, });



    if (isLoading) {
        <Loading />
    } else if (error) {
        return (
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">404</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </a>
                        <a href="#" className="text-sm font-semibold text-gray-900">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        );
    }
    else
        return (
            <>
                <Button className="m-2 -right-0" style={{ float: 'right' }} variant="secondary" onClick={() => deleteAll()}>Remove All</Button>
                <Button className="m-2 -right-0" style={{ float: 'right' }} variant="success" onClick={() => setShow(true)}>Add new</Button>
                <ModalAdd idIn={""} isForModifying={false} mutate={mutate} isActive={show} setActive={setShow} />
                <MyTable mutate={mutate}
                    sinhvien={data} />

            </>
        );
}
export default SinhVien;
