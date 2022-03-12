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
        <div>{JSON.stringify(error, null, 2)}</div>
      </div>
    )
  }

  if (!data) {
    return <Spinner text="Loading..." minHeight={300} />
  }
  return children
}

export default SwrRender
