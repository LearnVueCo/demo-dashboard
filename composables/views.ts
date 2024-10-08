import data from "~/data/transformed_data.json"

export type Views = {
  uploadDate: string
  title: string
  link: string
  length: number
  totalViews: number
  views: Array<{ date: string; view_count: number | string }>
}

function findCurrentStreak(data: Views[]): number {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - 3)
  let streak = 0
  for (let i = 0; i < data.length; i++) {
    const uploadDate = data[i].uploadDate
    if (uploadDate && uploadDate !== "-") {
      const uploadDateObj = new Date(uploadDate)
      // Check if the upload date is valid and consecutive
      if (uploadDateObj.getDate() === currentDate.getDate()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else if (
        uploadDateObj.getDate() ===
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        streak++
      } else {
        break // Break if the dates are not consecutive
      }
    }
  }

  return streak
}

export function useViews() {
  const legacyViews: Views | undefined = data.find((r) => r.uploadDate === "-")
  const views = data.filter((r) => r.uploadDate !== "-")

  const totalViews = data.reduce((acc, curr) => {
    return acc + curr.totalViews
  }, 0)

  const streak = findCurrentStreak(
    views.sort(
      (a, b) =>
        new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    )
  )

  const viewsByDate = views.reduce((acc, curr) => {
    curr.views.forEach((c) => {
      const match = acc.find(
        (a) => a.date.toDateString() === new Date(c.date).toDateString()
      )
      const views =
        typeof c.view_count === "number" ? c.view_count : parseInt(c.view_count)
      if (!match) {
        acc.push({ date: new Date(c.date), views: views })
      } else {
        match.views += views
      }
      return acc
    })
    return acc
  }, [] as unknown as Array<{ date: Date; views: number }>)

  const streakStartingDate = views[views.length - 1 - streak].uploadDate
  //

  return {
    legacyViews,
    data,
    views,
    streak,
    totalViews,
    streakStartingDate,
    viewsByDate,
  }
}
