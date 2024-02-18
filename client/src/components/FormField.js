import React from 'react'
import { Form } from 'react-bootstrap'

function FromField({label,type,placeholder,onChange,value,disabled=false,as,rows,name}) {
  return (
    <Form.Group className="mb-3 fw-bold"  >
        <Form.Label>{label}</Form.Label>
        <Form.Control disabled={disabled} as={as} rows={rows} required type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
      </Form.Group>
  )
}

export default FromField