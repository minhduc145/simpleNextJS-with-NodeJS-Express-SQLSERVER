"use client";

import { Button, Table } from "react-bootstrap";
import MyTable from '../../components/SinhVien/table'
import useSWR from "swr";
import ModalAdd from "@/components/SinhVien/modal_Add";
import { useState } from "react";
import Loading from "../loading";

function SinhVien() {
    const [show, setShow] = useState<boolean>(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR("http://localhost:5000/SinhVien", fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
    if (isLoading) {
        <Loading />
    }
    else
        return (
            <>
                <Button className="m-2 -right-0" style={{ float: 'right' }} variant="success" onClick={() => setShow(true)}>Add new</Button>
                <ModalAdd isActive={show} setActive={setShow} />
                <MyTable
                    sinhvien={data} />

            </>
        );
}
export default SinhVien;
