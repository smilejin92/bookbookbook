import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, selectBooks, Status } from '../../store/books'
import SearchForm from '../../components/SearchForm'
import Books from '../../components/Books'
import Pagination from '../../components/Books/Pagination'
import Stack from '../../components/Stack'

function Result() {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const { items, status } = useSelector(selectBooks)

  const moreThanOneItems = items.length > 0
  const newSearch = status === Status.Loading && !items.length

  useEffect(() => {
    if (!search) {
      return
    }

    dispatch(fetchBooks(search))
  }, [dispatch, search])

  return (
    <div className={styles.wrapper}>
      <Stack gaps={[0, 10, 20, 20]}>
        <SearchForm />
        {moreThanOneItems ? (
          <Books items={items} />
        ) : newSearch ? (
          <div>로딩 중...</div>
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
        <Pagination />
      </Stack>
    </div>
  )
}

const styles = {
  wrapper: 'pb-4'
}

export default Result
