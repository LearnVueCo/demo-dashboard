interface MovabeleOpts {
  default: {
    id: string
    items: string[]
  }[]
}
export function useMovable(opts: MovabeleOpts) {
  const locations = ref(opts.default)

  const getLocation = (item: string) => {
    // find the first location that has the item in its array
    const location = locations.value.find((l) => l.items.includes(item))

    if (!location) {
      return null
    }

    // get the index of the item
    const index = location.items.indexOf(item)
    return `#${location.id}-${index}`
  }

  const moveItem = (item: string, to: string) => {
    const clone: {
      id: string
      items: string[]
    }[] = JSON.parse(JSON.stringify(locations.value))
    // move the item to the new location and remove it from the old location
    const oldLocation = clone.find((l) => l.items.includes(item))
    const oldIndex = oldLocation?.items.indexOf(item)
    const targetIndex = parseInt(to.split("-").pop() ?? "0")
    const locationWithoutIndex = to.split("-").slice(0, -1).join("-")
    const newLocation = clone.find((l) => l.id === locationWithoutIndex)

    if (!oldLocation || !newLocation || oldIndex === undefined) {
      return
    }
    oldLocation.items.splice(oldIndex, 1)
    newLocation.items.splice(targetIndex, 0, item)
    locations.value = clone
  }

  return {
    getLocation,
    moveItem,
    locations,
  }
}
