let timeout: NodeJS.Timeout | undefined

export function debounce(func: () => Promise<any>, delay: number) {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    func()
  }, delay)
}
