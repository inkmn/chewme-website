import { useState } from 'react'

const TextTruncate = ({
  text,
  maxLength = 100,
}: {
  text: string
  maxLength?: number
}) => {
  // Create a piece of state, and initialize it to `true`
  // `hidden` will hold the current value of the state,
  // and `setHidden` will let us change it
  const [hidden, setHidden] = useState(true)

  // If the text is short enough, just render it
  if (text.length <= maxLength) {
    return <span>{text}</span>
  }

  // Render the text (shortened or full-length) followed by
  // a link to expand/collapse it.
  // When a link is clicked, update the value of `hidden`,
  // which will trigger a re-render
  return (
    <span>
      {hidden ? `${text.trim().substring(0, maxLength)} ...` : text}
      {hidden ? (
        <a onClick={() => setHidden(false)}> read more</a>
      ) : (
        <a onClick={() => setHidden(true)}> read less</a>
      )}
    </span>
  )
}

export default TextTruncate
