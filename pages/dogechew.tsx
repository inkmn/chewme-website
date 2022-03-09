import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'

const DogeChew = () => {
  return (
    <Layout>
      <PageHeader title={`Dogechew coin`} image={`/cover5.jpeg`} />
      <StyledDogeChew>
        <div className="container">This is DogeChew view</div>
      </StyledDogeChew>
    </Layout>
  )
}

const StyledDogeChew = styled.div`
  height: 500px;
`

export default DogeChew
