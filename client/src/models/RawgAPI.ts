export interface rawgAPI {
    id: number;
    name: string;
    short_screenshots: shortScreenshots[];
}

export interface shortScreenshots {
    id: number;
    image: string;
}