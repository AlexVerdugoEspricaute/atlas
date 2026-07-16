export function isSelected(path, pathname) {
    return pathname === path;
}

export function filterItems(items, search) {
    if (!search) {
        return items;
    }

    return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
}
