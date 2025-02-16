
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
Moment.locale('en');


interface IProps {
    idIn: any,
    isForModifying: boolean,
    mutate: any,
    isActive: boolean,
    setActive: (value: boolean) => void
}

function Content(props: IProps) {
    const idRef = useRef<any>();

    const [idValue, setId] = useState<string>("");
    const [fnameValue, setFname] = useState<string>("");
    const [genderValue, setGender] = useState<string>("true");
    const [bdateValue, setBdate] = useState<string>("");
    const { isActive, setActive, mutate, isForModifying, idIn } = props;

    async function getSV(id: any) {
        const fetcher = await fetch("http://localhost:5000/SinhVien/" + id, {
            method: "GET"
        });
        return (fetcher)
    }

    useEffect(() => {
        if (isForModifying) {
            if (idIn) {
                idRef.current = idIn;
                setId(idIn);
                getSV(idIn).then(token => token.json()).then(res => {
                    console.log(res[0])
                    setFname(res[0].HoTen)
                    setGender(res[0].GioiTinhNam.toString())
                    setBdate(Moment(res[0].NgaySinh)?.format('yyyy-MM-DD'))
                })

            }
        }
    }, [idIn])

    async function submitData() {
        let url = "http://localhost:5000/SinhVien/create";
        let method = "POST";
        if (isForModifying) {
            url = "http://localhost:5000/SinhVien/update/" + idIn;
            method = "PATCH";
        }
        var id = idValue.trim();
        var fname = fnameValue.trim();
        var orient = genderValue;
        var bdate = bdateValue.trim();
        var poststr = JSON.stringify({ id, fname, orient, bdate });
        const fetcher = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: poststr,
        });
        const rs = await fetcher.json()
        return rs;
    }


    const handleClose = () => setActive(false);
    const handleSave = () => {
        submitData().then((token) => {
            console.log(token)
            if (token['code'] == 1) {
                toast.success("Thành công!", {
                    position: "bottom-right",
                });
                setId("");
                setFname("");
                setGender("true");
                setBdate("");
                setActive(false);
                mutate(["http://localhost:5000/Sinhvien"]);
            } else {
                toast.error(token['message'], {
                    position: "bottom-right",
                });
            }
        });
    }
    return (
        <>
            <Modal show={isActive} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Student:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="formMaSinhVien" hidden={isForModifying}>
                            <Form.Label>Mã Sinh Viên</Form.Label>
                            <Form.Control key='id' type="text" autoFocus defaultValue={idValue} onChange={(e) => setId(e.currentTarget.value)} readOnly={isForModifying} required />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control key='fname' type="text" value={fnameValue} onChange={(e) => setFname(e.currentTarget.value)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGioiTinh">
                                <Form.Label>Giới Tính</Form.Label>
                                <Form.Select key='orient' value={genderValue.toString()} onChange={(e) => setGender(e.target.value)}>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formNgaySinh">
                                <Form.Label>Ngày Sinh</Form.Label>
                                <Form.Control key='bdate' type="date" value={bdateValue} onChange={(e) => setBdate(e.target.value)} />
                            </Form.Group>

                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>

                </Modal.Footer>
            </Modal >
        </>
    );

}
export default Content;