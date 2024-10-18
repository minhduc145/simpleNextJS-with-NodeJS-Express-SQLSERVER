'use client'

import React, { Suspense, useEffect, useState, useTransition } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "./loading";

const lstBtn = [{ id: 'sinhvien', title: 'Sinh Viên', url: "http://192.168.137.1:5000/SinhVien" },
{ id: 'products', title: 'Hàng hóa', url: "https://fakestoreapi.com/products" }]

export default function Content() {
  const [url, setURL] = useState('');
  const [type, setType] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (url) {
      fetch(url).then((token) => token.json()).then((final) => {
        setData(final);
      });
    }
  }, [type]);


  return (

    <div>
      <Form.Group className="mb-3">
        {lstBtn.map(x => (
          <Button key={x.id} variant="success" className="m-2" onClick={() => { setURL(url => x.url); setType(id => x.id); }}>{x.title}</Button>
        ))}
      </Form.Group>
      <ul>
        {
          data?.map(x => (
            <li key={x['MaSinhVien'] || x['id']}>Tên {x['HoTen'] || x['title']}</li>
          ))
        }
      </ul>

    </div>

  );
}
