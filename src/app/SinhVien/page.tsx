"use client";

import { Button } from "react-bootstrap";
import MyTable from '../../components/SinhVien/table'
import useSWR from "swr";
import ModalAdd from "@/components/SinhVien/modal_Add";
import { useState } from "react";
import Loading from "../loading";
import { toast } from "react-toastify";

function SinhVien() {
    async function deleteAll() {
        await fetch("http://localhost:5000/SinhVien/deleteAll", {
            method: "DELETE"
        }).then(token => token.json()).then(res => {
            console.log(res);
            toast.info("Xóa xong: " + res + " dòng!");
        });
        mutate(["http://localhost:5000/SinhVien"]);
    }
    const [show, setShow] = useState<boolean>(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading, mutate } = useSWR("http://localhost:5000/SinhVien", fetcher, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, });



    if (isLoading) {
        <Loading />
    } else if (error) {
        return <h1> There was an error!</h1>;
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
