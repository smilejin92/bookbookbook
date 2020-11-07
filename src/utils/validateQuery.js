const paramsValue = {
  filter: [' ', 'partial', 'full', 'ebooks', 'free-ebooks', 'paid-ebooks'],
  orderBy: ['relevance', 'newest'],
  printType: ['all', 'books', 'magazines']
}

export default function validateQuery(options) {
  for (const key in options) {
    const validOptions = paramsValue[key]
    const currentOption = options[key]

    if (!validOptions || !validOptions.includes(currentOption)) {
      return false
    }
  }

  return true
}
