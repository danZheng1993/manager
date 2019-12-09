import React from 'react'
import { Input, Label } from 'reactstrap'

export default ({
  input,
  label,
  placeholder,
  onChange,
  onKeyPress,
  options,
  type,
}) => (
  <div className="text-left">
    <Label>
      {label}
    </Label>
    <Input {...input} placeholder={placeholder || label} type={type} onChange={onChange} onKeyPress={onKeyPress}>
      {type === 'select' && options ? options.map((item, index) => (
        <option key={index} value={item.value}>{item.label}</option>
      )) : undefined}
    </Input>
  </div>
)
