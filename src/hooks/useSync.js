import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchBooks } from '../store/books'
import { parse } from 'query-string'
import validateQuery from '../utils/validateQuery'

function useSync() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { search, pathname } = useLocation()

  useEffect(() => {
    // 1. search가 없으면 메인으로
    if (!search) {
      history.push('/')
      return
    }

    // 2. search가 있다면 파라미터가 유효한지 체크
    const { q, ...rest } = parse(search)

    // 검색어가 존재하지 않거나, 나머지 파라미터 중 유효하지 않은 파라미터가 있다면
    if (!q?.trim() || !validateQuery(rest)) {
      history.push('/')
      return
    }

    // 3. 유효한 search이므로 검색 요청
    dispatch(fetchBooks(search))
  }, [dispatch, search, history, pathname])
}

export default useSync
