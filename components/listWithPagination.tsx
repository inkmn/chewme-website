import Spinner from '@/components/spinner'
import { Col, Empty, Pagination, Row } from 'antd'
import { useRouter } from 'next/router'

const ListWithPagination = ({
  children,
  data,
  error,
  page,
  limit,
  onPageChange,
}: {
  children: any
  data: any
  error: any
  page: number
  limit: number
  onPageChange: any
}) => {
  const router = useRouter()

  if (error) {
    return (
      <div>
        Oops there is something wrong!
        <pre style={{ color: 'red', fontSize: '12px' }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }

  if (!data) {
    return <Spinner text="Loading..." minHeight={300} />
  }

  if (data && !data.count) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  const handlePageChange = (currentPage: number) => {
    const qsData = {
      ...router.query,
      page: currentPage,
      limit,
    }
    onPageChange(qsData)
  }

  return (
    <div>
      <div>{children}</div>
      {parseInt(data?.count || 0, 10) > limit ? (
        <Row justify="end">
          <Col>
            <Pagination
              pageSize={limit}
              current={page}
              total={data?.count}
              onChange={handlePageChange}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default ListWithPagination
