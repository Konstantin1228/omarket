export interface CatalogItemProps {
    id: number;
    title: string;
    brand: string
    description: string;
    image: string;
    tags: string[];
    typeOfUnit: string
    discounts: number[];
    weight: number[];
    points: number[];
    price: number[];
    rating: number;
}