"use client";

import { Button, Table } from "react-bootstrap";
import MyTable from '../../components/SinhVien/table'
import useSWR from "swr";
import ModalAdd from "@/components/SinhVien/modal_Add";
import { useState } from "react";
import Loading from "../loading";

function Content() {
    const [show, setShow] = useState<boolean>(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR("https://fakestoreapi.com/products", fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
    console.log(data);
    if (isLoading) {
        <Loading />
    }
    else
        return (
            <>

            </>
        );
}
export default Content;
