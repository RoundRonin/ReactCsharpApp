export interface APIInterface {
    fetchData(endpoint: string, options?: any): Promise<any>
}
