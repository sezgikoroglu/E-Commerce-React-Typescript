
export type ICategory = {
    name: string
    selected: boolean
}

export type IProducts = {
    categories: Array<ICategory>
    filteredCategories: Array<ICategory>
    list: Array<any>
    filteredList: Array<any>
    filteredCount:number
    details:any
   
}
