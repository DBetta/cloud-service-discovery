
interface DescriptionDto {
    type: string;
    bedrooms: number
    bathrooms: number
}

interface AboutDto {
    status: string;
    nature: string;
}

export interface PropertySearchDto {
    description: DescriptionDto;
    about: AboutDto;
    internal: string[];
    external: string[];
    created_at: Date;
}