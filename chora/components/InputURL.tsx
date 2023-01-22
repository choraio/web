import * as React from "react"

const defaultId = "url"
const defaultLabel = "url"
const defaultPlaceholder = "https://chora.io"

const InputURL = ({ id, label, placeholder, url, setUrl }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <input
      id={id ? id : defaultId}
      value={url}
      placeholder={placeholder || defaultPlaceholder}
      onChange={event => setUrl(event.target.value)}
    />
  </label>
)

export default InputURL