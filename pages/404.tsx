import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import BoneButton from '@/components/boneButton'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { Button, Result, Divider, Row, Space } from 'antd'
import { useRouter } from 'next/router'

const Custom404 = () => {
  const router = useRouter()
  return (
    <Layout>
      <PageHeader title={`Not Found`} image={`/cover6.jpeg`} />
      <StyledOrigin>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              className="btn-green"
              type="primary"
              // onClick={() => router.push('/')}
            >
              Back Home
            </Button>
          }
        />
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  margin: 50px 0;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: var(--primary);
    padding: 0 30px;
  }
  p {
    padding: 0 30px;
    font-size: 1.2em;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .img {
    width: 100%;
    height: auto;
    padding: 30px;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 10px;
    }
  }
`

export default Custom404
