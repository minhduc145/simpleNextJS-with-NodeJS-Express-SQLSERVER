import { Button, Table } from "react-bootstrap";
import ModalAdd from "@/components/SinhVien/modal_Add";
import Moment from 'moment';
import { toast } from "react-toastify";
import { useState } from "react";
Moment.locale('en');
interface IProps {
    mutate: any,
    sinhvien: ISinhVien[]
}
export default function MyTable(props: IProps) {
    const [show, setShow] = useState<boolean>(false);
    const [idIn, setIdIn] = useState<string>("");
    const { sinhvien, mutate } = props;
    async function deleteSV(id: any) {
        await fetch("http://localhost:5000/SinhVien/delete/" + id, {
            method: 'DELETE',
        })
        props.mutate(["http://localhost:5000/SinhVien"]);
        toast.info("Đã xóa: " + id);
    }
    function handleOpen(id: string) {
        setIdIn(id);
        setShow(true);
    }
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>GT Nam</th>
                        <th>Ngày Sinh</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody key={'k1'}>
                    {

                        sinhvien?.map(x => (
                            <tr key={"rowkey" + x.MaSinhVien} >
                                <td>{x.MaSinhVien}</td>
                                <td>{(x.HoTen)}</td>
                                <td>{x.GioiTinhNam == true ? "x" : ""}</td>
                                <td>{Moment(x.NgaySinh?.toString()).format('D/MM/yyyy')}</td>

                                <td>
                                    <Button variant="primary" className="mx-2">View</Button>
                                    <Button id={x.MaSinhVien} variant="warning" className="mx-2" onClick={(e) => handleOpen(e.currentTarget.id)}>Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteSV(x.MaSinhVien)}>Remove</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
            <ModalAdd idIn={idIn} isForModifying={true} mutate={mutate} isActive={show} setActive={setShow} />

        </ >
    );
};