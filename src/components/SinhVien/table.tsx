import { Button, Table } from "react-bootstrap";
import Moment from 'moment';
import { toast } from "react-toastify";
Moment.locale('en');
interface IProps {
    mutate: any,
    sinhvien: ISinhVien[]
}

export default function MyTable(props: IProps) {
    const { sinhvien } = props;
    async function deleteSV(id: any) {
        await fetch("http://localhost:5000/SinhVien/delete/" + id, {
            method: 'DELETE',
        })
        props.mutate(["http://localhost:5000/SinhVien"]);
        toast.info("Đã xóa: " + id);
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
                <tbody>
                    {

                        sinhvien?.map(x => (
                            <tr key={x.MaSinhVien} >
                                <td>{x.MaSinhVien}</td>
                                <td>{(x.HoTen)}</td>
                                <td>{x.GioiTinhNam == true ? "x" : ""}</td>
                                <td>{Moment(x.NgaySinh?.toString()).format('D/MM/yyyy')}</td>

                                <td>
                                    <Button variant="primary" className="mx-2">View</Button>
                                    <Button variant="warning" className="mx-2">Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteSV(x.MaSinhVien)}>Remove</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
        </ >
    );
};