import Spinner from '@/components/spinner'

const SwrRender = ({
  children,
  data,
  error,
}: {
  children: any
  data: any
  error: any
}) => {
  if (error) {
    return (
      <div>
        Oops there is something wrong!
        <pre style={{ color: 'red' }}>{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }

  if (!data) {
    return <Spinner text="Loading..." minHeight={300} />
  }
  return children
}

export default SwrRender
