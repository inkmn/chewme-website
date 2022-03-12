import useInit from '@/hooks/useInit'
import styled from 'styled-components'
import ActiveLink from './activeLink'

const FilterNavbar = ({
  pathname = '/',
}: {
  pathname: string
}): JSX.Element => {
  const { data } = useInit()
  return (
    <StyledFilterBar>
      <div className="categories">
        <h2>Category</h2>
        <div className="category-item">
          <ActiveLink exact href={`${pathname}`}>
            <a>All</a>
          </ActiveLink>
        </div>
        {data.categories_tree.map((category) => (
          <div className="category-item" key={category.id}>
            <ActiveLink href={`${pathname}?category_id=${category.id}`}>
              <a>{category.name}</a>
            </ActiveLink>
            {category.children &&
              category.children.length &&
              category.children.map((subCategory) => (
                <div
                  className="category-item sub-category"
                  key={subCategory.id}
                >
                  <ActiveLink
                    href={`${pathname}?category_id=${subCategory.id}`}
                  >
                    <a>{subCategory.name}</a>
                  </ActiveLink>
                </div>
              ))}
          </div>
        ))}
      </div>
    </StyledFilterBar>
  )
}

const StyledFilterBar = styled.div`
  .categories {
    display: flex;
    flex-direction: column;
    .category-item {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;

      &.sub-category {
        margin-left: 1rem;
      }

      a {
        color: #4e4e4e;
        font-size: 1rem;
        &.selected {
          color: var(--primary);
          font-weight: 700;
        }
      }
    }
  }
`

export default FilterNavbar
