const mods = import.meta.globEager('./*.vue')
export default Object.values(mods).map((item) => item.default)
