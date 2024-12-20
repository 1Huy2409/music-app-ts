import unidecode from "unidecode"

export const convertSlug = (searchValue: string) : string => {
    let slugString: string = unidecode(searchValue);
    slugString = slugString.replace(/\s+/g, "-");
    slugString = slugString.trim();
    return slugString;
}