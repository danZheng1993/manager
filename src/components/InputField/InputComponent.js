import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

export default ({
  input,
  label,
  placeholder,
  onChange,
  options,
  type,
}) => (
  <div className="text-left">
    <Label>
      {label}
    </Label>
    <Input {...input} placeholder={placeholder || label} type={type} onChange={onChange}>
      {type === 'select' && options ? options.map((item, index) => (
        <option key={index} value={item.value}>{item.label}</option>
      )) : undefined}
    </Input>
  </div>
)
