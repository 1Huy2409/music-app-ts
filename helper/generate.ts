export const randomString = (length: number) =>
{
    const OGString: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    let res: string = "";
    for (let i: number = 0; i < length; i++)
    {
        res += OGString.charAt(Math.floor(Math.random() * OGString.length));
    }
    return res;
}