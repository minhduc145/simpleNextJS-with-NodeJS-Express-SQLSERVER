import { Button, Table } from "react-bootstrap";
interface IProps {
    sinhvien: ISinhVien[]
}

export default function MyTable(props: IProps) {
    const { sinhvien } = props;
    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>GT Nam</th>
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
                                <td>
                                    <Button variant="primary" className="mx-2">View</Button>
                                    <Button variant="warning" className="mx-2">Edit</Button>
                                    <Button variant="danger" className="mx-2">Remove</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
        </ >
    );
};