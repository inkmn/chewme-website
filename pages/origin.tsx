import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import BoneButton from '@/components/boneButton'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { Button, Divider, Space } from 'antd'

const Origin = () => {
  return (
    <Layout>
      <PageHeader title={`Origin`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <div>This is Origin view</div>
          <BoneButton>BoneButton</BoneButton>
          <BoneButtonFlat>BoneButton</BoneButtonFlat>
          <Divider />
          <Space>
            <Button size="large">BoneButton</Button>
            <Button size="middle">BoneButton</Button>
            <Button size="small">BoneButton</Button>
          </Space>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  height: 500px;
`

export default Origin
