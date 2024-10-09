const formattedCurrentYear = () => {
  const date = new Date()
  return { year: date.getFullYear() }
}

const useGetDateFormatted = () => {
  return {
    formattedCurrentYear,
  }
}

export default useGetDateFormatted
