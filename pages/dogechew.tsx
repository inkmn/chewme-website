import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'

const DogeChew = () => {
  return (
    <Layout>
      <PageHeader title={`Dogechew coin`} image={`/cover5.jpeg`} />
      <StyledDogeChew>
        <div className="container">
          <h2>Loyalty Program</h2>
          <h4>SHOP & GET REWARDED</h4>
          <p>Earn more and redeem your free Himalayan Pet Supply products.</p>
          <p>
            As a loyal Himalayan Pet Supply customer, you’ll earn points on
            every purchase you make that can be redeemed for your favorite
            products! Once you’ve accumulated enough points, unlock your rewards
            on your next purchase!
          </p>
          <h2>Here’s How It Works</h2>
        </div>
      </StyledDogeChew>
    </Layout>
  )
}

const StyledDogeChew = styled.div`
  height: 500px;

  h2 {
    font-weight: 700;
    color: var(--primary);
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 0;
    margin-top: 3rem;
  }

  h4 {
    font-weight: 400;
    color: var(--primary);
    font-size: 1.5rem;
    text-align: center;
  }
  p {
    font-size: 1rem;
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 0.9rem;
  }
`

export default DogeChew
