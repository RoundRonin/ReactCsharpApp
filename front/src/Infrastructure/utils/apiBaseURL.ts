export const getApiBaseUrl = (): string => {
    if (typeof window === "undefined") {
        return process.env.INTERNAL_API_URL || "http://backend:8080";
    }
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
};
