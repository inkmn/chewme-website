import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'

const Origin = () => {
  return (
    <Layout>
      <PageHeader title={`Origin`} image={`/cover4.jpeg`} />
      <StyledOrigin>
        <div className="container">This is Origin view</div>
      </StyledOrigin>
    </Layout>
  )
}

const StyledOrigin = styled.div`
  height: 500px;
`

export default Origin
