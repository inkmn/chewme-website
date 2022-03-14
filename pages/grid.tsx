import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Collapse } from 'antd'

const { Panel } = Collapse

const Grid = () => {
  function callback({ key }: { key: any }) {
    console.log(key)
  }

  return (
    <Layout>
      <PageHeader title={`Frequently Ask Questions`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <div className="row">
            <div className="box">aa</div>
            <div className="box">aa</div>
            <div className="box">aa</div>
            <div className="box">aa</div>
            <div className="box">aa</div>
            <div className="box">aa</div>
          </div>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  .box {
    width: 100%;
    background: #e8e8e8;
    height: 100%;
    max-width: 220px;
    max-height: 220px;
    min-width: 120px;
    min-height: 120px;
    border-radius: 2px;
    border: 1px solid #8e8e8e;
    margin: 12px;
  }
`

export default Grid
