export interface AgencyProps {
    id: number;
    name: string;
    description:string;
    slogan: string;
    city: string;
    quater: string;
    openingTime: string;
    closingTime: string;
    followers: number;
    isOpen: boolean;   // A retirer
    stars: number;
    type: string;
    createdAt: Date;
    updatedAt: Date; 
    images: string[];
    onLike: (id: number) => void; // Fonction pour gérer les likes
    onDislike: (id: number) => void; // Fonction pour gérer les dislikes
}