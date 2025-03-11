export interface QueryOptions<T> {
    queryKey: unknown[];
    queryFn: () => Promise<T>;
    initialData?: T;
}

export interface QueryResult<T, E = Error> {
    data?: T;
    error?: E;
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
}