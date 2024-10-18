
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mutate } from 'swr';


interface IProps {
    mutate: any,
    isActive: boolean,
    setActive: (value: boolean) => void
}

function Content(props: IProps) {
    const idRef = useRef<any>();
    const fnameRef = useRef<any>();
    const orientRef = useRef<any>();
    const bdateRef = useRef<any>();


    async function submitData() {
        var id = idRef.current.value.trim();
        var fname = fnameRef.current.value.trim();
        var orient = orientRef.current.value.trim();
        var bdate = bdateRef.current.value.trim();
        var poststr = JSON.stringify({ id, fname, orient, bdate });
        let rt = null;
        const fetcher = await fetch("http://localhost:5000/SinhVien/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: poststr,
        });
        const rs = fetcher.json()
        return rs;
    }


    const { isActive, setActive } = props;
    const handleClose = () => setActive(false);
    const handleSave = () => {
        submitData().then((token) => {
            if (token['code'] == 1) {
                toast.success("Thành công!", {
                    position: "bottom-right",
                });
                setActive(false);
                props.mutate(["http://localhost:5000/SinhVien/"]);
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
                        <Form.Group className="mb-3" controlId="formMaSinhVien">
                            <Form.Label>Mã Sinh Viên</Form.Label>
                            <Form.Control key='id' type="text" autoFocus ref={idRef} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control key='fname' type="text" ref={fnameRef} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGioiTinh">
                                <Form.Label>Giới Tính</Form.Label>
                                <Form.Select key='orient' ref={orientRef}>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formNgaySinh">
                                <Form.Label>Ngày Sinh</Form.Label>
                                <Form.Control key='bdate' type="date" ref={bdateRef} />
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